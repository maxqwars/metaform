/**
 * Type validation utility functions.
 */

/**
 * Checks if a value is an optional string (undefined or a string).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is an optional string, false otherwise.
 */
export function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string'
}

/**
 * Checks if a value is a valid string (a non-empty string that does not consist only of digits).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is a valid string, false otherwise.
 */
export function isValidString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0 && !/^\d+$/.test(value)
}

/**
 * Checks if a value is an optional number (undefined or a number).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is an optional number, false otherwise.
 */
export function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === 'number'
}

/**
 * Checks if a value is a valid number (a finite and not-NaN number).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is a valid number, false otherwise.
 */
export function isValidNumber(value: unknown): boolean {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

/**
 * Checks if a value is an optional and valid number (undefined or a valid number).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is an optional and valid number, false otherwise.
 */
export function isOptionalValidNumber(value: unknown): boolean {
  return value === undefined || isValidNumber(value)
}

/**
 * Checks if a value is a nullable string (undefined, null, or a string).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is a nullable string, false otherwise.
 */
export function isNullableString(value: unknown): boolean {
  return value === undefined || value === null || typeof value === 'string'
}

/**
 * Checks if a value is an optional and valid string (undefined or a valid string).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is an optional and valid string, false otherwise.
 */
export function isValidOptionalString(value: unknown): boolean {
  return value === undefined || isValidString(value)
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Checks if a value is a valid UUID (Universally Unique Identifier) string.
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is a valid UUID, false otherwise.
 */
export function isUuid(value: unknown): boolean {
  return typeof value === 'string' && UUID_PATTERN.test(value)
}

/**
 * Checks if a value is an optional UUID (undefined or a valid UUID).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is an optional UUID, false otherwise.
 */
export function isOptionalUuid(value: unknown): boolean {
  return value === undefined || isUuid(value)
}

/**
 * Checks if a value is an optional boolean (undefined or a boolean).
 * @param {unknown} value The value to check.
 * @returns {boolean} True if the value is an optional boolean, false otherwise.
 */
export function isOptionalBoolean(value: unknown): boolean {
  return value === undefined || typeof value === 'boolean'
}

/**
 * Type guard that checks if a value is a Record (object with string keys).
 * @param {unknown} value The value to check.
 * @returns {value is Record<string, unknown>} True if the value is a Record, false otherwise.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
