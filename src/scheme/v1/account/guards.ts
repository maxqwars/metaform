import type { AccountApiScheme } from './types'
import { Image } from '@/scheme/v1'
import { isDecimalNumber, isNullableOptional, isNullableOptionalString, isPlainObject } from '@/helpers/type-guards'

export function isAccountApiScheme(value: unknown): value is AccountApiScheme {
  if (!isPlainObject(value)) return false

  return isDecimalNumber(value.id) && isNullableOptionalString(value.nickname) && Image.guards.isNullableOptionalImageWithOptimizedApiScheme(value.avatar)
}

export const isNullableOptionalAccountApiScheme = isNullableOptional(isAccountApiScheme)
