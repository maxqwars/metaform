import type { RoleApiScheme } from './types'
import { isNullableString, isOptional, isOptionalDecimalNumber, isOptionalString, isOptionalUUID, isPlainObject } from '@/helpers/type-guards'

export function isRoleApiScheme(value: unknown): value is RoleApiScheme {
  if (!isPlainObject(value)) return false
  return isOptionalUUID(value.id) && isOptionalString(value.title) && isNullableString(value.color) && isOptionalDecimalNumber(value.sort_order)
}

export const isOptionalRoleApiScheme = isOptional(isRoleApiScheme)
