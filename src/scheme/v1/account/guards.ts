import type { AccountApiResponse } from './types'
import { Image } from '@/scheme/v1'
import {
  isDecimalNumber,
  isNullableOptional,
  isNullableOptionalString,
  isPlainObject,
} from '@/helpers/type-guards'

export function isAccountApiResponse(value: unknown): value is AccountApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isDecimalNumber(value.id) &&
    isNullableOptionalString(value.nickname) &&
    Image.guards.isNullableOptionalImageWithOptimizedResponse(value.avatar)
  )
}

export const isNullableOptionalAccountApiResponse = isNullableOptional(isAccountApiResponse)
