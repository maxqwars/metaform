import { isNullableOptional, isOptional, isOptionalBoolean, isOptionalDecimalNumber, isNullableString, isPlainObject, isOptionalUUID } from '@/helpers/type-guards'
import type { UserApiScheme } from './types'

export function isUserApiScheme(value: unknown): value is UserApiScheme {
  if (!isPlainObject(value)) return false

  return (
    isOptionalUUID(value.id) &&
    isNullableString(value.nickname) &&
    isOptionalBoolean(value.is_intern) &&
    isOptionalDecimalNumber(value.sort_order) &&
    isOptionalBoolean(value.is_vacation)
  )
}

export const isOptionalUserApiScheme = isOptional(isUserApiScheme)
export const isNullableOptionalUserApiScheme = isNullableOptional(isUserApiScheme)
