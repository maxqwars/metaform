# Overview of Metaform architecture

## Терминология

| Термин        | Значение                                  |
| ------------- | ----------------------------------------- |
| `ApiResponse` | структура непосредственно из API          |
| `Model`       | нормализованная структура Metaform        |
| `guard`       | проверка `unknown → ApiResponse`          |
| `mapper`      | преобразование `ApiResponse → Model`      |
| `scheme`      | набор типов + guard + mapper для сущности |

## Жизненный цикл API-запроса

```
getTeams()
    ↓
version-map
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

## Особенности архитектуры Metaform

### 1. Транспорт — это заменяемый интерфейс

HTTP-коммуникация абстрагирована за интерфейсом Transport:

```typescript
interface Transport {
  request<T>(req: RequestTransport): Promise<TransportResponse<T>>
}
```

Реализация по умолчанию (createFetchTransport) оборачивает нативный fetch. Любой потребитель может заменить свой транспорт — например, чтобы внедрить заголовки аутентификации, использовать axios или имитировать запросы в тестах — не изменяя код самой библиотеки. Это основная точка расширения библиотеки.

### 2. Каждый эндпоинт определяется один раз в карте версий (version map)

Файл `src/api/version-map.ts` является единым источником истины для всех поддерживаемых эндпоинтов. Каждая запись в этой карте объединяет четыре элемента:

- guard — проверяет, соответствует ли сырой ответ API ожидаемой структуре
- mapper — преобразует сырой ApiResponse во внутренний Model тип библиотеки
- serializeParams — преобразует типизированные параметры запроса в Record<string, string> для URL
- path — строка пути эндпоинта API

Тут очень важна идея:

```
                  VersionMap
                     │
       ┌─────────────┼─────────────┐
       │             │             │
      v1            v2            v3
       │             │             │
    Team v1       Team v2       Team v3
```

То есть version-map позволяет API-функциям оставаться версионно-агностичным generic plumbing, а различия между версиями находятся в данных конфигурации.

Такая структура означает, что добавление нового эндпоинта никогда не требует изменений в конвейере (pipeline) запросов — только новой записи в карте и соответствующего модуля схемы.

### 3. Схема каждого эндпоинта находится в собственном модуле

Каждый эндпоинт в `src/scheme/v1/<entity>/` содержит ровно 3 файла:

| Файл       | Ответственность                                                                              |
| ---------- | -------------------------------------------------------------------------------------------- |
| types.ts   | TypeScript интерфейсы как для сырого ApiResponse, так и для сопоставленного внутреннего типа |
| guards.ts  | Функции проверки типов (type-guard) в рантайме, валидирующие сырой ответ API                 |
| mappers.ts | Чистая функция, преобразующая валидированный ApiResponse во Model тип                        |

Внутренние типы следуют строгому контракту: каждое поле всегда присутствует и является либо конкретным значением, либо null. Типы сырых ApiResponse отражают реальное API, где поля могут быть undefined (отсутствовать). Маппер служит границей между этими двумя мирами.

### 4. Функции API «тонкие» и обобщенные (generic)

Функции в `src/api/functions/` представляют собой преимущественно вспомогательный код (plumbing). Типичный вызов выглядит так:

```typescript
export async function getTeams<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: TeamsParams<V>,
): Promise<TeamsResult<V>>
```

Параметр типа `V` позволяет TypeScript автоматически выводить точный тип возвращаемого значения и тип параметров на основе переданной версии — пользователю не нужно выполнять явное приведение типов. Сама функция просто извлекает guard, mapper, serializeParams и path из карты версий, выполняет запрос, проверяет ответ и возвращает преобразованный результат.

### 5. Типы-гарды защищают границу рантайма

Файл `src/helpers/type-guards.ts` предоставляет небольшие составные примитивные гарды (isOptionalString, isOptionalUUID, isOptionalDecimalNumber, isPlainObject и т.д.). Функции-гарды в `src/scheme/<version>/<entity>/guards.ts` комбинируют эти примитивы для валидации полного ApiResponse. Если API возвращает структуру, отличную от ожидаемой, гард выбросит ошибку на границе, не позволяя некорректному объекту просочиться в остальную часть приложения.

#

Для обеспечения полноты типов и их валидации в runtime Metaform использует систему схем. Схема предназначена для определения типов (включая ответы сервера), создания guard'ов для проверки данных и мапперов для преобразования ответов API в формат Metaform.

Metaform поддерживает структуры любой сложности: от простых объектов до сложных сущностей, включающих вложенные объекты. Сложные структуры реализуются через композицию мапперов, guard'ов и типов из базовых компонентов.

Использование схем обеспечивает качественный автокомплит и валидацию данных при выполнении. Типы Metaform являются Null-safe: разработчику не требуется выполнять дополнительные проверки на undefined, пустые строки или пустые массивы. Если значение отсутствует в ответе сервера, оно автоматически принимает значение null.

### Реализация типов сущностей API

Для реализации сущности необходимо создать директорию по пути: `/src/scheme/<версия_api>/<имя*сущности>`.

Важно: Вам не нужно изучать структуру API вручную. Metaform использует инструмент [openapi-typescript](https://openapi-ts.dev/) для автоматической генерации типов из спецификации OpenAPI. Сгенерированные типы доступны в файле `/src/generated/scheme.<версия_api>.ts`. При реализации ответов от сервера всегда опирайтесь на эту автоматически сгенерированную версию.

Каждая схема сущности должна содержать следующие файлы:

- **index.ts**: основной файл экспорта.
- **guards.ts**: функции для валидации типов в runtime.
- **mappers.ts**: мапперы для преобразования ответов сервера в формат Metaform.
- **types.ts**: определения как API-типов, так и моделей Metaform.

Ниже приведен пример реализации схемы для сущности `User`.

#### index.ts

Главный экспортный файл схемы, обратите внимание на формат экспортов:

- `type * as scheme` - для экспорта типов
- `export * as guards` - для экспорта функций проверки типов
- `export * as mappers` - для мапперов

```typescript
export type * as scheme from './types'
export * as guards from './guards'
export * as mappers from './mappers'
```

#### guards.ts

Обратите внимание на нейминг, используется имя вида `to<Entity>ApiResponse`. Для реализации проверки базовых типов используйте хелперы из набора `type-guards.ts`, в дальнейщем для более сложных сущностей включающих, в себя другие сущности используйте наработки других, уже реализованных схем.

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

> **type-guards** - Набор базовых хелперов для покрытия пограничных случаев в JavaScript, например для отделения Array от типа Object. Так же включает набор дополнительных функций для валидации UUID и других типов, добавления isOptional и других возможностей. См. подробнее в файле `src/helpers/type-guards.ts`

#### mappers.ts

Обратите внимание на нейминг, используется имя вида `to<Model>`

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

#### types.ts

Файл определения типов, обратите внимание что типы которыми отвечает сервер берутся из сгенерированной схемы и имеют имя вида `<Entity>ApiResponse`, а модель библиотеки называется просто по имени сущьности.

Так же обратите внимание на экспорт типа `UserFieldsPaths`, этот экспорт позволяет получить пути до всех полей обьекта, используется для параметров запроса `include` и `exclude`.

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

> **NestedKeyOf** - специальный хелпер для генерации типа для идентификаторов полей обьекта, в том числе вложенных. Большая часть методов API позволяет указывать поля которые должны или не должны быть включены в ответ, этот хелпер позволяет вам автоматически выводить пути до полей вида `prop.prop...(итд.)` до самого глубокого уровня вложенности. Благодаря этому хелперу вы получете autocomplete для `include` и `exclude` всех полей обьекта ответа а не только `top-level`.

### Реализация типов и проверок для методов API

Для добавления поддержки конкретного метода API создается файл по пути `/scheme/method/[method]/index.ts`. В отличие от описания схем данных, методы API опираются на существующие типы, из которых собираются ответы. Поэтому при добавлении методов не требуется создавать отдельные файлы guards, types, mappers и экспортные модули. Более того, при реализации guards и mappers должны использоваться компоненты, уже реализованные в схеме для конкретной сущности. Это обеспечивает единый источник истины (Single Source of Truth) для маппинга и проверки типов в runtime. Часто ошибки несоответствия форматов возникают именно из-за дублирования логики: когда проверка типа в guards метода не совпадает с проверкой базового типа в схеме сущности.

```typescript
import { Team } from '@/scheme/v1/'

/*
 * Типы ответов: Используйте [method]ApiResponse для данных от сервера
 * и [method]Response для представлений внутри библиотеки.
 */
export type GetTeamsApiResponse = Team.scheme.TeamApiResponse[]
export type GetTeamsResponse = Team.scheme.Team[]

/*
 * Параметры запроса (Query Params): Используйте суффикс [method]QueryParams.
 */
export interface GetTeamsQueryParams {
  include?: Team.scheme.TeamFieldsPaths[]
  exclude?: Team.scheme.TeamFieldsPaths[]
}

/*
 * Валидация ответа (Guard): Используйте формат is[method]Response.
 * Обратите внимение что isGetTeamsApiResponse использует guard Team.guards.isTeamResponse, потому что GetTeamsApiResponse это массив Team.scheme.Team
 */
export function isGetTeamsApiResponse(value: unknown): value is GetTeamsApiResponse {
  return Array.isArray(value) && value.every(Team.guards.isTeamResponse)
}

/*
 * Маппинг (API Response -> Model): Используйте формат to[method]Response.
 * Обратите внимение что toGetTeamsResponse использует mapper Team.mappers.toTeam, потому что GetTeamsApiResponse это массив Team.scheme.Team
 */
export function toGetTeamsResponse(dto: GetTeamsApiResponse): GetTeamsResponse {
  return dto.map((value) => Team.mappers.toTeam(value))
}

/*
 * Сериализация параметров запроса: Используйте формат serialize[method]QueryParams.
 */
export function serializeGetTeamsQueryParams(params: GetTeamsQueryParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
```
