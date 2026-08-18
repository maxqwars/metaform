# Metaform — Architecture Overview

## Table of Contents

- [Terminology](#terminology)
- [API Request Lifecycle](#api-request-lifecycle)
- [Architectural Principles](#architectural-principles)
  1. [Transport — a replaceable interface](#1-transport--a-replaceable-interface)
  2. [Version map — a single source of truth](#2-each-endpoint-is-defined-once-in-the-version-map)
  3. [Endpoint schema — an isolated module](#3-each-endpoint-schema-resides-in-its-own-module)
  4. [API functions — thin and generic](#4-api-functions-are-thin-and-generic)
  5. [Type guards at the runtime boundary](#5-type-guards-protect-the-runtime-boundary)
- [Implementation Guide](#implementation-guide)
  - [Implementing an Entity Schema](#implementing-an-entity-schema)
  - [Implementing an API Method](#implementing-an-api-method)
  - [Registering in the Version Map](#registering-in-the-version-map)
  - [Checklist: Adding a New Endpoint](#checklist-adding-a-new-endpoint)
- [Testing](#testing)

## Terminology

| Term          | Meaning                                              |
| ------------- | ---------------------------------------------------- |
| `ApiResponse` | raw structure received directly from the API         |
| `Model`       | normalized (null-safe) Metaform structure            |
| `guard`       | type guard, validation from `unknown → ApiResponse`  |
| `mapper`      | pure function converting `ApiResponse → Model`       |
| `schema`      | set of types + guard + mapper for a single entity\*  |
| `entity`      | API domain entity (e.g. `Team`, `User`)              |
| `Transport`   | interface abstracting HTTP communication             |
| `version map` | registry of all supported API versions and endpoints |

\* In the code, the directory is named `src/scheme/`, but semantically it is a _schema_ (a typed description of data), not a _scheme_ (a plan or procedure). The term “schema” is used throughout the text below.

## API Request Lifecycle

```text
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

## Architectural Principles

### 1. Transport — a replaceable interface

HTTP communication is abstracted behind the `Transport` interface:

```typescript
interface Transport {
  request<T>(req: RequestTransport): Promise<TransportResponse<T>>
}
```

The default implementation (`createFetchTransport`) wraps the native `fetch`. Any consumer can replace the transport — for example, to add authentication headers, use axios, or mock requests in tests — without changing the library's own code. This is the library's primary extension point.

### 2. Each endpoint is defined once in the version map

The `src/api/version-map.ts` file is the single source of truth for all supported endpoints. Each entry combines four elements:

- **guard** — checks whether the raw API response matches the expected structure;
- **mapper** — converts the raw `ApiResponse` into the library's internal `Model` type;
- **serializeParams** — converts typed request parameters into `Record<string, string>` for the URL;
- **path** — the API endpoint path string.

```text
                  VersionMap
                     │
        ┌────────────┼─────────────┐
        │            │             │
       v1           v2            v3
        │            │             │
     Team v1      Team v2       Team v3
```

The version map allows API functions to remain version-agnostic generic pipelines, while differences between versions are encapsulated in configuration data. As a result, adding a new endpoint never requires changes to the request pipeline itself — only a new entry in the map and the corresponding schema module.

### 3. Each endpoint schema resides in its own module

The schema is responsible for type completeness and runtime validation: it defines types (including server responses), guards for validating data, and mappers for converting API responses into the Metaform format.

Each endpoint in `src/scheme/<api_version>/<entity>/` contains exactly 4 files:

| File         | Responsibility                                                    |
| ------------ | ----------------------------------------------------------------- |
| `index.ts`   | main schema export file                                           |
| `types.ts`   | TypeScript interfaces for both raw `ApiResponse` and `Model`      |
| `guards.ts`  | type guard functions validating the raw API response at runtime   |
| `mappers.ts` | pure function converting a validated `ApiResponse` into a `Model` |

Internal types (`Model`) follow a strict contract: every field is always present and is either a concrete value or `null`. `ApiResponse` types reflect the real API, where fields may be `undefined` (missing). The mapper serves as the boundary between these two worlds — as a result, Metaform types are null-safe, and developers do not need to additionally check for `undefined`, empty strings, or empty arrays.

Metaform supports structures of any complexity: from simple objects to complex entities with nested objects. Complex structures are implemented by composing mappers, guards, and types from simpler, already implemented schemas.

### 4. API functions are thin and generic

Functions in `src/api/functions/` are primarily helper code (plumbing). A typical call looks like this:

```typescript
export async function getTeams<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: TeamsParams<V>,
): Promise<TeamsResult<V>>
```

The type parameter `V` allows TypeScript to automatically infer the exact return type and parameter type based on the supplied version — the user does not need to perform an explicit type assertion. The function itself retrieves `guard`, `mapper`, `serializeParams`, and `path` from the version map, performs the request, validates the response, and returns the transformed result.

### 5. Type guards protect the runtime boundary

The `src/helpers/type-guards.ts` file provides small composable primitives (`isOptionalString`, `isOptionalUUID`, `isOptionalDecimalNumber`, `isPlainObject`, etc.) — they handle JavaScript edge cases, such as distinguishing an `Array` from an `Object`. Guard functions in `src/scheme/<version>/<entity>/guards.ts` combine these primitives to validate the complete `ApiResponse`. If the API returns a structure different from the expected one, the guard throws an error at the boundary, preventing an invalid object from leaking into the rest of the application.

## Implementation Guide

### Implementing an Entity Schema

To implement an entity, create the directory `src/scheme/<api_version>/<entity_name>/`.

> You do not need to study the API structure manually. Metaform uses [openapi-typescript](https://openapi-ts.dev/) to automatically generate types from the OpenAPI specification. The generated types are available in `src/generated/scheme.<api_version>.ts`. When implementing server responses, always rely on this automatically generated version.

An entity schema always consists of four files: `index.ts`, `types.ts`, `guards.ts`, `mappers.ts` (see the table in section [3](#3-each-endpoint-schema-resides-in-its-own-module)). Below is an example implementation of a schema for the `User` entity.

#### index.ts

The main schema export file. Note the export format:

- `export type * as scheme` — for exporting types;
- `export * as guards` — for type-checking functions;
- `export * as mappers` — for mappers.

```typescript
export type * as scheme from './types'
export * as guards from './guards'
export * as mappers from './mappers'
```

#### types.ts

The types returned by the server are taken from the generated schema and named `<Entity>ApiResponse`. The library model is named simply after the entity.

Note the `UserFieldsPaths` type export — it allows you to obtain paths to all fields of the object and is used for the `include` and `exclude` request parameters.

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

> **NestedKeyOf** — a helper for generating a type containing object field paths, including nested fields. Most API methods allow specifying which fields should or should not be included in the response; this helper automatically derives paths in the form `prop.prop...` down to the deepest nesting level. This gives you autocompletion for `include` and `exclude` across all response fields, not just top-level fields.

#### guards.ts

Use the `is<Entity>ApiResponse` naming convention. For checking primitive types, use the helpers from `type-guards.ts`; for more complex entities containing other entities, use the patterns from already implemented schemas.

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

Use the `to<Model>` naming convention.

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

### Implementing an API Method

To add support for a specific API method, create the file `src/scheme/method/[method]/index.ts`. Unlike data schemas, API methods rely on existing types from which responses are composed: there is no need to create separate `guards`, `types`, `mappers`, and export modules.

When implementing a method's `guards` and `mappers`, use components already implemented in the corresponding entity schema. This provides a single source of truth for mapping and runtime validation — format mismatches most often occur because of duplicated logic, when a type check in a method guard diverges from the base type check in the entity schema.

```typescript
import { Team } from '@/scheme/v1/'

/*
 * Response types: use [method]ApiResponse for data from the server
 * and [method]Response for the representation inside the library.
 */
export type GetTeamsApiResponse = Team.scheme.TeamApiResponse[]
export type GetTeamsResponse = Team.scheme.Team[]

/*
 * Query parameters: use the [method]QueryParams suffix.
 */
export interface GetTeamsQueryParams {
  include?: Team.scheme.TeamFieldsPaths[]
  exclude?: Team.scheme.TeamFieldsPaths[]
}

/*
 * Response validation (guard): use the is[method]ApiResponse format.
 * isGetTeamsApiResponse uses Team.guards.isTeamApiResponse,
 * because GetTeamsApiResponse is an array of Team.scheme.TeamApiResponse.
 */
export function isGetTeamsApiResponse(value: unknown): value is GetTeamsApiResponse {
  return Array.isArray(value) && value.every(Team.guards.isTeamApiResponse)
}

/*
 * Mapping (ApiResponse → Model): use the to[method]Response format.
 * toGetTeamsResponse uses the Team.mappers.toTeam mapper because
 * GetTeamsResponse is an array of Team.scheme.Team.
 */
export function toGetTeamsResponse(dto: GetTeamsApiResponse): GetTeamsResponse {
  return dto.map((value) => Team.mappers.toTeam(value))
}

/*
 * Query parameter serialization: use the serialize[method]QueryParams format.
 */
export function serializeGetTeamsQueryParams(params: GetTeamsQueryParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
```

### Registering in the Version Map

An implemented method is not callable on its own yet — the final step connects it to a specific API version in `src/api/version-map.ts`. This entry is what turns the method's four exported functions into a generic call such as `getTeams()` from section [4](#4-api-functions-are-thin-and-generic):

```typescript
export const versionMap = {
  v1: {
    getTeams: {
      path: '/teams',
      guard: isGetTeamsApiResponse,
      mapper: toGetTeamsResponse,
      serializeParams: serializeGetTeamsQueryParams,
    },
    // ...other v1 endpoints
  },
  // v2, v3...
} satisfies VersionMap
```

After this step, `getTeams(transport, 'v1', params)` is available to library consumers — the entire remaining pipeline (see [API Request Lifecycle](#api-request-lifecycle)) runs automatically.

### Checklist: Adding a New Endpoint

1. Check/generate types from OpenAPI (`openapi-typescript`) — [`src/generated/scheme.<version>.ts`](#implementing-an-entity-schema).
2. Implement the entity schema if it does not already exist — `types.ts` / `guards.ts` / `mappers.ts` / `index.ts`.
3. Implement the method — response types, guard, mapper, and query parameter serialization.
4. Register an entry in `version-map.ts`.
5. Cover the guard, mapper, and method itself with tests (see [Testing](#testing)).
6. Done — the endpoint is available through the generic API function.

## Testing

Tests are written with [Vitest](https://vitest.dev/) and are located next to the module being tested. The minimum coverage for each new endpoint is the guard and mapper of the corresponding schema; for API methods and generic functions, the call itself should additionally be tested.

### Guards

They test the runtime boundary — the reason they exist in the first place. Each guard should cover:

- a valid `ApiResponse` — the guard returns `true`;
- an object with missing optional fields — the guard still returns `true` (the fields are optional);
- an object with a field of the wrong type (e.g. a number instead of a string) — the guard returns `false`;
- a non-object input (`null`, array, primitive) — the guard returns `false`.

```typescript
import { describe, expect, it } from 'vitest'
import { isUserApiResponse } from './guards'

describe('isUserApiResponse', () => {
  it('accepts a valid ApiResponse', () => {
    expect(isUserApiResponse({ id: 'uuid', nickname: 'foo', is_intern: false })).toBe(true)
  })

  it('accepts an object without optional fields', () => {
    expect(isUserApiResponse({})).toBe(true)
  })

  it('rejects an object with a field of the wrong type', () => {
    expect(isUserApiResponse({ id: 123 })).toBe(false)
  })

  it('rejects a non-object', () => {
    expect(isUserApiResponse(null)).toBe(false)
  })
})
```

### Mappers

Since mappers are pure functions, testing comes down to checking specific input/output pairs. Null-safety deserves special attention — this is the contract described in section [3](#3-each-endpoint-schema-resides-in-its-own-module):

```typescript
import { describe, expect, it } from 'vitest'
import { toUser } from './mappers'

describe('toUser', () => {
  it('maps all fields from ApiResponse', () => {
    expect(
      toUser({ id: 'uuid', nickname: 'foo', is_intern: false, sort_order: 1, is_vacation: false }),
    ).toEqual({ id: 'uuid', nickname: 'foo', isIntern: false, sortOrder: 1, isVacation: false })
  })

  it('replaces missing fields with null', () => {
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

### API Call Functions

Here, what is being tested is no longer pure logic, but the combination of guard + mapper + `Transport`, so `Transport` is replaced with a mock implementation — the same extension point described in section [1](#1-transport--a-replaceable-interface). The following should be verified:

- happy path — the mock transport returns a valid `ApiResponse`, and the function returns the correct `Model`;
- the guard rejects the response — the function throws an error instead of allowing invalid data to proceed;
- request parameters are serialized correctly and passed to `Transport.request()`.

```typescript
import { describe, expect, it, vi } from 'vitest'
import { getTeams } from './functions'
import type { Transport } from '@/transport'

const createMockTransport = (response: unknown): Transport => ({
  request: vi.fn().mockResolvedValue({ data: response }),
})

describe('getTeams', () => {
  it('returns the mapped result for a valid response', async () => {
    const transport = createMockTransport([{ id: 'uuid', name: 'Team A' }])
    const result = await getTeams(transport, 'v1')
    expect(result).toEqual([{ id: 'uuid', name: 'Team A' }])
  })

  it('throws an error when the response fails the guard', async () => {
    const transport = createMockTransport([{ id: 123 }])
    await expect(getTeams(transport, 'v1')).rejects.toThrow()
  })
})
```
