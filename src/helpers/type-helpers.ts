// When developing type guards for types, you’ll end up writing huge true/false expressions for them, and they’ll look absolutely massive.
// So it’s better to use these helper functions to make this nightmare a little easier to handle.

export function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string'
}

export function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === 'number'
}

export function isOptionalNumberAndNotNaN(value: unknown): boolean {
  return value === undefined || (typeof value === 'number' && !Number.isNaN(value))
}

export function isNullableString(value: unknown): boolean {
  return value === undefined || value === null || typeof value === 'string'
}
