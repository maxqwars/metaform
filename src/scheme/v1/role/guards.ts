import type { RoleApiResponse } from './types'
import {
  isNullableString,
  isOptional,
  isOptionalDecimalNumber,
  isOptionalString,
  isOptionalUUID,
  isPlainObject,
} from '@/helpers/type-guards'

export function isRoleResponse(value: unknown): value is RoleApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isOptionalUUID(value.id) &&
    isOptionalString(value.title) &&
    isNullableString(value.color) &&
    isOptionalDecimalNumber(value.sort_order)
  )
}

export const isOptionalRoleResponse = isOptional(isRoleResponse)
