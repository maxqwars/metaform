import type { ApiErrorDto } from './types'
import { isPlainObject, isOptionalString } from '@/helpers/type-guards'

export function isApiErrorDto(value: unknown): value is ApiErrorDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.message),
    value.errors === undefined || isFieldErrorsRecord(value.errors),
  ]

  return checks.every(Boolean)
}

function isFieldErrorsRecord(value: unknown): value is Record<string, string[]> {
  if (!isPlainObject(value)) return false
  return Object.values(value).every(
    (v) => Array.isArray(v) && v.every((item) => typeof item === 'string'),
  )
}
