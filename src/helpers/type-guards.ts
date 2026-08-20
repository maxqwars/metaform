/**
 * Type-checking utilities used in type guards to ensure runtime type safety.
 */

export function isOptional<T>(
  predicate: (value: unknown) => value is T,
): (value: unknown) => value is T | undefined {
  return (value: unknown): value is T | undefined => value === undefined || predicate(value)
}

export function isNullableOptional<T>(
  predicate: (value: unknown) => value is T,
): (value: unknown) => value is T | null | undefined {
  return (value: unknown): value is T | null | undefined =>
    value === undefined || value === null || predicate(value)
}

/*
 * String
 */

/** Checks that a value is a string with zero length. */
export function isEmptyString(value: unknown): value is '' {
  return typeof value === 'string' && value.length === 0
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export const isNullableString = isNullableOptional(isString)
export const isOptionalString = isOptional(isString)
export const isNullableOptionalString = isNullableOptional(isString)

/*
 * Number edge cases
 */

/** Checks that a value is a `number`, excluding `NaN` and `Infinity`/`-Infinity`. */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * Checks that a value is a `number`, excluding `NaN` and `Infinity`/`-Infinity`.
 * NOTE: currently identical to `isNumber`, since `Number.isFinite` already
 * excludes `NaN`. If this was meant to distinguish decimals from integers,
 * see `isInteger` below.
 */
export function isDecimalNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

export const isOptionalDecimalNumber = isOptional(isDecimalNumber)

/*
 * Object edge cases
 */

/** Checks that a value is a non-null object (includes arrays, `Date`, etc). */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

/** Checks that a value is a non-null object and not an array. */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Checks that a value is an array. */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/** Checks that a value is exactly `null`. */
export function isNull(value: unknown): value is null {
  return value === null
}

/*
 * Advanced cases
 */

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const HTTP_URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

/** Checks that a value is a string matching the UUID format. */
export function isUUID(value: unknown): value is string {
  return typeof value === 'string' && UUID_PATTERN.test(value)
}

export const isOptionalUUID = isOptional(isUUID)

/** Checks that a value is a string matching an `http(s)://` URL shape. */
export function isURL(value: unknown): value is string {
  return typeof value === 'string' && HTTP_URL_RE.test(value)
}

/** Checks that a value is a string representing an absolute URL path (e.g. `/foo`), excluding protocol-relative paths (`//foo`). */
export function isURLPath(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.startsWith('/') &&
    !value.startsWith('//')
  )
}

export const isOptionalURLPath = isOptional(isURLPath)
export const isNullableOptionalURLPath = isNullableOptional(isURLPath)

/*
 * Additional edge cases (JS-specific gotchas worth guarding against)
 */

/** Checks that a value is an integer number (e.g. `1`, not `1.5`). */
export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value)
}

/**
 * Checks that a value is an integer within the safe range (±(2^53 - 1)).
 * Useful for IDs/timestamps that may have come through as `number` from JSON,
 * where values outside this range silently lose precision.
 */
export function isSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value)
}

/**
 * Checks that a value is `NaN`.
 * `typeof NaN === 'number'`, so a plain `typeof` check won't catch this case.
 */
export function isNaNValue(value: unknown): value is number {
  return typeof value === 'number' && Number.isNaN(value)
}

/** Checks that a value is a `bigint`. */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

/**
 * Checks that a value is a valid `Date` instance.
 * `new Date('invalid')` is still `instanceof Date`, but its `getTime()` is `NaN` —
 * this guard rejects that case.
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/** Checks that a value is an array with zero elements. */
export function isEmptyArray(value: unknown): value is [] {
  return Array.isArray(value) && value.length === 0
}

/** Checks that a value is an array with at least one element. */
export function isNonEmptyArray(value: unknown): value is [unknown, ...unknown[]] {
  return Array.isArray(value) && value.length > 0
}

/** Checks that a value is a plain object with no own enumerable keys. */
export function isEmptyObject(value: unknown): value is Record<string, never> {
  return isPlainObject(value) && Object.keys(value).length === 0
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export const isNullableBoolean = isNullableOptional(isBoolean)
export const isOptionalBoolean = isOptional(isBoolean)
