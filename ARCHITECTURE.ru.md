# Metaform — обзор архитектуры

## Оглавление

- [Терминология](#терминология)
- [Жизненный цикл API-запроса](#жизненный-цикл-api-запроса)
- [Архитектурные принципы](#архитектурные-принципы)
  1. [Транспорт — заменяемый интерфейс](#1-транспорт--заменяемый-интерфейс)
  2. [Version map — единый источник истины](#2-каждый-эндпоинт-определяется-один-раз-в-карте-версий-version-map)
  3. [Схема эндпоинта — изолированный модуль](#3-схема-каждого-эндпоинта-находится-в-собственном-модуле)
  4. [Функции API — тонкие и обобщённые](#4-функции-api-тонкие-и-обобщённые-generic)
  5. [Type-guard'ы на границе рантайма](#5-type-guardы-защищают-границу-рантайма)
- [Руководство по реализации](#руководство-по-реализации)
  - [Реализация схемы сущности](#реализация-схемы-сущности)
  - [Реализация метода API](#реализация-метода-api)
  - [Регистрация в version map](#регистрация-в-version-map)
  - [Чеклист: добавление нового эндпоинта](#чеклист-добавление-нового-эндпоинта)
- [Тестирование](#тестирование)

## Терминология

| Термин        | Значение                                            |
| ------------- | --------------------------------------------------- |
| `ApiResponse` | сырая структура, полученная непосредственно от API  |
| `Model`       | нормализованная (null-safe) структура Metaform      |
| `guard`       | type-guard, проверка `unknown → ApiResponse`        |
| `mapper`      | чистая функция преобразования `ApiResponse → Model` |
| `schema`      | набор типов + guard + mapper для одной сущности\*   |
| `entity`      | предметная сущность API (например, `Team`, `User`)  |
| `Transport`   | интерфейс, абстрагирующий HTTP-коммуникацию         |
| `version map` | реестр всех поддерживаемых версий и эндпоинтов API  |

\* В коде каталог называется `src/scheme/`, но по смыслу это именно _schema_ (типизированное описание данных), а не _scheme_ (план/схема действий) — в тексте ниже используется термин «схема».

## Жизненный цикл API-запроса

```
getTeams()
    ↓
version map
    ↓
path + serializeParams
    ↓
Transport.request()
    ↓
HTTP API
    ↓
unknown response
    ↓
guard
    ↓
ApiResponse
    ↓
mapper
    ↓
Metaform Model
```

## Архитектурные принципы

### 1. Транспорт — заменяемый интерфейс

HTTP-коммуникация абстрагирована за интерфейсом `Transport`:

```typescript
interface Transport {
  request<T>(req: RequestTransport): Promise<TransportResponse<T>>
}
```

Реализация по умолчанию (`createFetchTransport`) оборачивает нативный `fetch`. Любой потребитель может заменить транспорт — например, чтобы добавить заголовки аутентификации, использовать axios или подменять запросы в тестах — не изменяя код самой библиотеки. Это основная точка расширения библиотеки.

### 2. Каждый эндпоинт определяется один раз в карте версий (version map)

Файл `src/api/version-map.ts` — единый источник истины для всех поддерживаемых эндпоинтов. Каждая запись объединяет четыре элемента:

- **guard** — проверяет, соответствует ли сырой ответ API ожидаемой структуре;
- **mapper** — преобразует сырой `ApiResponse` во внутренний `Model` тип библиотеки;
- **serializeParams** — преобразует типизированные параметры запроса в `Record<string, string>` для URL;
- **path** — строка пути эндпоинта API.

```
                  VersionMap
                     │
       ┌─────────────┼─────────────┐
       │             │             │
      v1            v2            v3
       │             │             │
    Team v1       Team v2       Team v3
```

Version map позволяет API-функциям оставаться версионно-агностичным generic-конвейером (pipeline), а различия между версиями инкапсулированы в данных конфигурации. Благодаря этому добавление нового эндпоинта никогда не требует изменений в самом конвейере запросов — только новой записи в карте и соответствующего модуля схемы.

### 3. Схема каждого эндпоинта находится в собственном модуле

Схема отвечает за полноту типов и их валидацию в рантайме: определяет типы (включая ответы сервера), guard'ы для проверки данных и мапперы для преобразования ответов API в формат Metaform.

Каждый эндпоинт в `src/scheme/<версия_api>/<entity>/` содержит ровно 4 файла:

| Файл         | Ответственность                                                       |
| ------------ | --------------------------------------------------------------------- |
| `index.ts`   | основной файл экспорта схемы                                          |
| `types.ts`   | TypeScript-интерфейсы как для сырого `ApiResponse`, так и для `Model` |
| `guards.ts`  | type-guard функции, валидирующие сырой ответ API в рантайме           |
| `mappers.ts` | чистая функция, преобразующая валидированный `ApiResponse` в `Model`  |

Внутренние типы (`Model`) следуют строгому контракту: каждое поле всегда присутствует и является либо конкретным значением, либо `null`. Типы `ApiResponse` отражают реальное API, где поля могут быть `undefined` (отсутствовать). Маппер служит границей между этими двумя мирами — благодаря этому типы Metaform null-safe, и разработчику не нужно дополнительно проверять `undefined`, пустые строки или пустые массивы.

Metaform поддерживает структуры любой сложности: от простых объектов до сложных сущностей с вложенными объектами. Сложные структуры реализуются через композицию мапперов, guard'ов и типов из более простых, уже реализованных схем.

### 4. Функции API «тонкие» и обобщённые (generic)

Функции в `src/api/functions/` — это преимущественно вспомогательный код (plumbing). Типичный вызов выглядит так:

```typescript
export async function getTeams<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: TeamsParams<V>,
): Promise<TeamsResult<V>>
```

Параметр типа `V` позволяет TypeScript автоматически выводить точный тип возвращаемого значения и тип параметров на основе переданной версии — пользователю не нужно выполнять явное приведение типов. Сама функция извлекает `guard`, `mapper`, `serializeParams` и `path` из карты версий, выполняет запрос, проверяет ответ и возвращает преобразованный результат.

### 5. Type-guard'ы защищают границу рантайма

Файл `src/helpers/type-guards.ts` предоставляет небольшие составные примитивы (`isOptionalString`, `isOptionalUUID`, `isOptionalDecimalNumber`, `isPlainObject` и т.д.) — они закрывают пограничные случаи JavaScript, например отделение `Array` от `Object`. Guard-функции в `src/scheme/<version>/<entity>/guards.ts` комбинируют эти примитивы для валидации полного `ApiResponse`. Если API возвращает структуру, отличную от ожидаемой, guard выбрасывает ошибку на границе — не позволяя некорректному объекту просочиться в остальную часть приложения.

## Руководство по реализации

### Реализация схемы сущности

Для реализации сущности создайте директорию `src/scheme/<версия_api>/<имя_сущности>/`.

> Вам не нужно изучать структуру API вручную. Metaform использует [openapi-typescript](https://openapi-ts.dev/) для автоматической генерации типов из спецификации OpenAPI. Сгенерированные типы доступны в файле `src/generated/scheme.<версия_api>.ts`. При реализации ответов от сервера всегда опирайтесь на эту автоматически сгенерированную версию.

Схема сущности всегда состоит из четырёх файлов: `index.ts`, `types.ts`, `guards.ts`, `mappers.ts` (см. таблицу в разделе [3](#3-схема-каждого-эндпоинта-находится-в-собственном-модуле)). Ниже — пример реализации схемы для сущности `User`.

#### index.ts

Главный экспортный файл схемы. Обратите внимание на формат экспортов:

- `export type * as scheme` — для экспорта типов;
- `export * as guards` — для функций проверки типов;
- `export * as mappers` — для мапперов.

```typescript
export type * as scheme from './types'
export * as guards from './guards'
export * as mappers from './mappers'
```

#### types.ts

Типы, которыми отвечает сервер, берутся из сгенерированной схемы и называются `<Entity>ApiResponse`. Модель библиотеки называется просто по имени сущности.

Обратите внимание на экспорт типа `UserFieldsPaths` — он позволяет получить пути до всех полей объекта и используется для параметров запроса `include` и `exclude`.

```typescript
import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

export type UserApiResponse = components['schemas']['models.teams.v1.team.user']

export interface User {
  id: string | null
  nickname: string | null
  isIntern: boolean | null
  sortOrder: number | null
  isVacation: boolean | null
}

export type UserFieldsPaths = NestedKeyOf<UserApiResponse>
```

> **NestedKeyOf** — хелпер для генерации типа идентификаторов полей объекта, включая вложенные. Большая часть методов API позволяет указывать поля, которые должны или не должны быть включены в ответ; этот хелпер автоматически выводит пути вида `prop.prop...` до самого глубокого уровня вложенности. Благодаря этому вы получаете автокомплит для `include` и `exclude` по всем полям ответа, а не только на верхнем уровне.

#### guards.ts

Используется нейминг вида `is<Entity>ApiResponse`. Для проверки базовых типов используйте хелперы из `type-guards.ts`; для более сложных сущностей, включающих другие сущности, используйте наработки уже реализованных схем.

```typescript
import {
  isOptionalBoolean,
  isOptionalDecimalNumber,
  isOptionalString,
  isOptionalUUID,
  isPlainObject,
} from '@/helpers/type-guards'
import type { UserApiResponse } from './types'

export function isUserApiResponse(value: unknown): value is UserApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isOptionalUUID(value.id) &&
    isOptionalString(value.nickname) &&
    isOptionalBoolean(value.is_intern) &&
    isOptionalDecimalNumber(value.sort_order) &&
    isOptionalBoolean(value.is_vacation)
  )
}
```

#### mappers.ts

Используется нейминг вида `to<Model>`.

```typescript
import type { UserApiResponse, User } from './types'

export function toUser(dto: UserApiResponse): User {
  return {
    id: dto.id ?? null,
    nickname: dto.nickname ?? null,
    isIntern: dto.is_intern ?? null,
    isVacation: dto.is_vacation ?? null,
    sortOrder: dto.sort_order ?? null,
  }
}
```

### Реализация метода API

Для добавления поддержки конкретного метода API создаётся файл `src/scheme/method/[method]/index.ts`. В отличие от схем данных, методы API опираются на уже существующие типы, из которых собираются ответы: не нужно создавать отдельные `guards`, `types`, `mappers` и экспортные модули.

При реализации `guards` и `mappers` метода должны использоваться компоненты, уже реализованные в схеме соответствующей сущности. Это обеспечивает единый источник истины (Single Source of Truth) для маппинга и валидации в рантайме — ошибки несоответствия форматов чаще всего возникают именно из-за дублирования логики, когда проверка типа в guard'е метода расходится с проверкой базового типа в схеме сущности.

```typescript
import { Team } from '@/scheme/v1/'

/*
 * Типы ответов: используйте [method]ApiResponse для данных от сервера
 * и [method]Response для представления внутри библиотеки.
 */
export type GetTeamsApiResponse = Team.scheme.TeamApiResponse[]
export type GetTeamsResponse = Team.scheme.Team[]

/*
 * Параметры запроса (query params): используйте суффикс [method]QueryParams.
 */
export interface GetTeamsQueryParams {
  include?: Team.scheme.TeamFieldsPaths[]
  exclude?: Team.scheme.TeamFieldsPaths[]
}

/*
 * Валидация ответа (guard): используйте формат is[method]ApiResponse.
 * isGetTeamsApiResponse использует guard Team.guards.isTeamApiResponse,
 * потому что GetTeamsApiResponse — это массив Team.scheme.TeamApiResponse.
 */
export function isGetTeamsApiResponse(value: unknown): value is GetTeamsApiResponse {
  return Array.isArray(value) && value.every(Team.guards.isTeamApiResponse)
}

/*
 * Маппинг (ApiResponse → Model): используйте формат to[method]Response.
 * toGetTeamsResponse использует mapper Team.mappers.toTeam, потому что
 * GetTeamsResponse — это массив Team.scheme.Team.
 */
export function toGetTeamsResponse(dto: GetTeamsApiResponse): GetTeamsResponse {
  return dto.map((value) => Team.mappers.toTeam(value))
}

/*
 * Сериализация параметров запроса: используйте формат serialize[method]QueryParams.
 */
export function serializeGetTeamsQueryParams(params: GetTeamsQueryParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
```

### Регистрация в version map

Реализованный метод сам по себе ещё не вызываем — последний шаг связывает его с конкретной версией API в `src/api/version-map.ts`. Именно эта запись превращает четыре экспортированные функции метода в generic-вызов вроде `getTeams()` из раздела [4](#4-функции-api-тонкие-и-обобщённые-generic):

```typescript
export const versionMap = {
  v1: {
    getTeams: {
      path: '/teams',
      guard: isGetTeamsApiResponse,
      mapper: toGetTeamsResponse,
      serializeParams: serializeGetTeamsQueryParams,
    },
    // ...другие эндпоинты v1
  },
  // v2, v3...
} satisfies VersionMap
```

После этого шага `getTeams(transport, 'v1', params)` доступен потребителю библиотеки — весь остальной pipeline (см. [Жизненный цикл API-запроса](#жизненный-цикл-api-запроса)) отработает автоматически.

### Чеклист: добавление нового эндпоинта

1. Проверить/сгенерировать типы из OpenAPI (`openapi-typescript`) — [`src/generated/scheme.<версия>.ts`](#реализация-схемы-сущности).
2. Реализовать схему сущности, если её ещё нет — `types.ts` / `guards.ts` / `mappers.ts` / `index.ts`.
3. Реализовать метод — типы ответа, guard, mapper, сериализация query-параметров.
4. Зарегистрировать запись в `version-map.ts`.
5. Покрыть guard, mapper и сам метод тестами (см. [Тестирование](#тестирование)).
6. Готово — эндпоинт доступен через generic API-функцию.

## Тестирование

Тесты пишутся на [Vitest](https://vitest.dev/) и располагаются рядом с тестируемым модулем. Минимальное покрытие для каждого нового эндпоинта — guard и mapper соответствующей схемы; для методов API и generic-функций дополнительно тестируется сам вызов.

### Guards

Проверяют границу рантайма — то, ради чего они и существуют. Для каждого guard'а стоит покрыть:

- корректный `ApiResponse` — guard возвращает `true`;
- объект с отсутствующими опциональными полями — guard всё равно возвращает `true` (поля опциональны);
- объект с полем неверного типа (например, число вместо строки) — guard возвращает `false`;
- не-объект на входе (`null`, массив, примитив) — guard возвращает `false`.

```typescript
import { describe, expect, it } from 'vitest'
import { isUserApiResponse } from './guards'

describe('isUserApiResponse', () => {
  it('принимает корректный ApiResponse', () => {
    expect(isUserApiResponse({ id: 'uuid', nickname: 'foo', is_intern: false })).toBe(true)
  })

  it('принимает объект без опциональных полей', () => {
    expect(isUserApiResponse({})).toBe(true)
  })

  it('отклоняет объект с полем неверного типа', () => {
    expect(isUserApiResponse({ id: 123 })).toBe(false)
  })

  it('отклоняет не-объект', () => {
    expect(isUserApiResponse(null)).toBe(false)
  })
})
```

### Mappers

Поскольку мапперы — чистые функции, тест сводится к проверке конкретных пар вход/выход. Отдельного внимания заслуживает null-safety — контракт, описанный в разделе [3](#3-схема-каждого-эндпоинта-находится-в-собственном-модуле):

```typescript
import { describe, expect, it } from 'vitest'
import { toUser } from './mappers'

describe('toUser', () => {
  it('маппит все поля из ApiResponse', () => {
    expect(
      toUser({ id: 'uuid', nickname: 'foo', is_intern: false, sort_order: 1, is_vacation: false }),
    ).toEqual({ id: 'uuid', nickname: 'foo', isIntern: false, sortOrder: 1, isVacation: false })
  })

  it('заменяет отсутствующие поля на null', () => {
    expect(toUser({})).toEqual({
      id: null,
      nickname: null,
      isIntern: null,
      sortOrder: null,
      isVacation: null,
    })
  })
})
```

### Функции вызова API

Здесь тестируется уже не чистая логика, а связка guard + mapper + `Transport`, поэтому `Transport` подменяется мок-реализацией — той самой точкой расширения из раздела [1](#1-транспорт--заменяемый-интерфейс). Стоит проверить:

- happy path — мок-транспорт возвращает валидный `ApiResponse`, функция отдаёт корректный `Model`;
- guard отклоняет ответ — функция выбрасывает ошибку, а не пропускает невалидные данные дальше;
- параметры запроса корректно сериализуются и попадают в `Transport.request()`.

```typescript
import { describe, expect, it, vi } from 'vitest'
import { getTeams } from './functions'
import type { Transport } from '@/transport'

const createMockTransport = (response: unknown): Transport => ({
  request: vi.fn().mockResolvedValue({ data: response }),
})

describe('getTeams', () => {
  it('возвращает смапленный результат при валидном ответе', async () => {
    const transport = createMockTransport([{ id: 'uuid', name: 'Team A' }])
    const result = await getTeams(transport, 'v1')
    expect(result).toEqual([{ id: 'uuid', name: 'Team A' }])
  })

  it('выбрасывает ошибку, если ответ не проходит guard', async () => {
    const transport = createMockTransport([{ id: 123 }])
    await expect(getTeams(transport, 'v1')).rejects.toThrow()
  })
})
```
