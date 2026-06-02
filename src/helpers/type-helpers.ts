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

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(value: unknown): boolean {
  return typeof value === 'string' && UUID_PATTERN.test(value)
}

export function isOptionalUuid(value: unknown): boolean {
  return value === undefined || isUuid(value)
}
