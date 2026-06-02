export function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string'
}

export function isValidString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0 && !/^\d+$/.test(value)
}

export function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === 'number'
}

export function isValidNumber(value: unknown): boolean {
  return typeof value === 'number' && !Number.isNaN(value)
}

export function isOptionalValidNumber(value: unknown): boolean {
  return value === undefined || isValidNumber(value)
}

export function isNullableString(value: unknown): boolean {
  return value === undefined || value === null || typeof value === 'string'
}

export function isValidOptionalString(value: unknown): boolean {
  return value === undefined || isValidString(value)
}
