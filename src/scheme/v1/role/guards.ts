import type { RoleApiResponse } from './types'
import {
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
    isOptionalString(value.color) &&
    isOptionalDecimalNumber(value.sort_order)
  )
}

export const isOptionalRoleResponse = isOptional(isRoleResponse)
