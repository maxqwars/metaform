# AGENTS.md

## About the Project

Metaform is an open-source TypeScript library for working with the AniLiberty API. Its goal is to provide a convenient, type-safe, and predictable interface for developing applications that use this API.

### Project Goals

- **API versioning:** Support multiple API versions with corresponding request and response types.
- **Comprehensive type system:** Provide static TypeScript types for the library's public API.
- **Cross-platform compatibility:** Support different JavaScript runtimes and execution environments.
- **Tree-shaking:** Allow unused code to be eliminated from application bundles.
- **Runtime validation:** Validate data structures at runtime.

## Technology Stack

- TypeScript — primary programming language.
- ESLint — static code analysis.
- Prettier — code formatting.
- EditorConfig — consistent editor configuration.
- pnpm — package manager.
- tsdown — library build tool.
- Vitest — testing framework.
- openapi-typescript — TypeScript type generation from OpenAPI specifications.

## Source Code Structure

The library's source code is located in the `src/` directory at the repository root.

### `src/api/`

Contains the public API functions intended for direct use by library consumers.

It also contains the API version map, which associates supported API versions with their corresponding request and response types.

`unwrap-transport-result.ts` handles transport-level results and converts them into the format expected by the API layer.

### `src/errors/`

Contains the error classes defined by Metaform:

- API errors.
- Transport errors.
- Response validation errors, raised when received data does not match the expected structure.

When handling errors, preserve the distinction between error categories and use the library's existing error classes.

### `src/generated/`

Contains automatically generated source code.

Currently, this directory contains TypeScript types for API v1, generated from an OpenAPI specification using `openapi-typescript`.

**Do not edit generated files manually.** If generated definitions need to be changed, locate the corresponding OpenAPI specification and generation configuration first.

### `src/helpers/`

Contains shared utility functions and types used throughout the project.

In particular:

- `nestedKeyOf.ts` — a utility type for constructing paths to nested object properties.
- `type-guards.ts` — runtime type guard functions for validating JavaScript values.

Before introducing a new utility, check whether an existing implementation in `src/helpers/` can be reused instead of duplicating functionality.

### `src/scheme/`

Contains the implementation of Metaform's type system.

The system is based on the OpenAPI specification and adapts its definitions to the characteristics of JavaScript and TypeScript. It includes runtime validation, data transformation, and `null` handling.

This directory also contains type definitions and related implementations used by API methods.

When modifying a schema, ensure that static types, runtime validation, and data transformations remain consistent.

### `src/transport/`

Contains the implementation of Metaform's transport layer.

The transport layer is responsible for sending HTTP requests and receiving responses. By default, Metaform uses an implementation based on the standard `fetch()` API.

When modifying the transport layer, preserve compatibility with existing API methods and error-handling mechanisms.

### `src/index.ts`

The library's primary entry point, defining its public exports.

New public features should be exported deliberately. Do not expose internal implementations, utility functions, or implementation details through public entry points without a clear reason.

### `src/bundle.ts`

An additional entry point used to produce a complete, statically bundled version of the library.

It is intended for scenarios where the library needs to be distributed or used as a single bundled file, including in Deno environments.

## Code Modification Rules

- Never edit generated files manually.
- Preserve backward compatibility of the public API.
- Do not introduce new runtime dependencies without a justified need.
- Do not expose internal implementations through public entry points unnecessarily.
- Follow the project's existing architectural decisions and coding conventions.
- Before introducing a new utility, check whether an appropriate implementation already exists in `src/helpers/`.
- Avoid unrelated behavioral changes unless they are necessary for the task.
- Update relevant tests and documentation when changing public behavior.

## Type System Rules

- Use Metaform's existing type system and runtime validation mechanisms.
- Keep TypeScript static types consistent with runtime data validation.
- Do not use type assertions (`as`) or non-null assertions (`!`) to suppress potentially invalid data without justification.
- Ensure request and response types correspond to the appropriate API versions.
- Use the type guard functions in `src/helpers/type-guards.ts` when they are suitable for the validation task or JavaScript edge cases being handled.
- Use `nestedKeyOf` to construct paths to nested properties of large, structured objects, such as `Video` and `Release`. Avoid using it unnecessarily for simple objects or local operations.
- When modifying schemas, verify runtime validation, data transformations, and `null` handling.
- Do not treat static typing as sufficient protection when processing external data.

## Testing Rules

- Add tests for new features and bug fixes.
- Test successful scenarios, invalid input, and error conditions.
- For type guard functions, test valid values, invalid values, and edge cases.
- For mappers, test transformation correctness, missing and `null` values, and other edge cases required by the relevant contract.
- When changing existing behavior, verify that previously supported scenarios continue to work.
- Run the relevant tests and available project checks before completing a task.
- Never claim that checks passed if they were not actually executed or if they failed.

## Development Commands

Before performing development tasks, inspect `package.json` and use the scripts defined by the project.

When validating changes:

1. Run tests relevant to the modified code.
2. Run the complete test suite when feasible and appropriate.
3. Run ESLint to check the code.
4. Check formatting with Prettier using the project's configured command.
5. Build the library.
6. Review the Git diff and ensure that it contains no unintended files, build artifacts, or unwanted public API changes.

If any check was not performed, explicitly mention it in the final report.
