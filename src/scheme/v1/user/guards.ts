import {
  isNullableOptional,
  isOptional,
  isOptionalBoolean,
  isOptionalDecimalNumber,
  isNullableString,
  isPlainObject,
  isOptionalUUID,
} from '@/helpers/type-guards'
import type { UserApiResponse } from './types'

export function isUserApiResponse(value: unknown): value is UserApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isOptionalUUID(value.id) &&
    isNullableString(value.nickname) &&
    isOptionalBoolean(value.is_intern) &&
    isOptionalDecimalNumber(value.sort_order) &&
    isOptionalBoolean(value.is_vacation)
  )
}

export const isOptionalUserApiResponse = isOptional(isUserApiResponse)
export const isNullableOptionalUserApiResponse = isNullableOptional(isUserApiResponse)
