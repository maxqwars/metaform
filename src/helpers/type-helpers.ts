/**
 * Checks if a value is optional string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is undefined or a string, false otherwise.
 */
export function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string'
}

/**
 * Checks if a value is valid string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is a string, has length greater than 0 and does not contain only digits, false otherwise.
 */
export function isValidString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0 && !/^\d+$/.test(value)
}

/**
 * Checks if a value is optional number.
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is undefined or a number, false otherwise.
 */
export function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === 'number'
}

/**
 * Checks if a value is valid number.
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is a number, false otherwise.
 */
export function isValidNumber(value: unknown): boolean {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * Checks if a value is optional valid number.
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is undefined or valid number, false otherwise.
 */
export function isOptionalValidNumber(value: unknown): boolean {
  return value === undefined || isValidNumber(value)
}

/**
 * Checks if a value is nullable string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is undefined, null or a string, false otherwise.
 */
export function isNullableString(value: unknown): boolean {
  return value === undefined || value === null || typeof value === 'string'
}

export function isValidOptionalString(value: unknown): boolean {
  return value === undefined || isValidString(value)
}
