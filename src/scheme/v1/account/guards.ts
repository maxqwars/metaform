import type { AccountApiResponse } from './types'
import { Guards as ImageGuards } from '@/scheme/v1/image'
import { isDecimalNumber, isOptionalString, isPlainObject } from '@/helpers/type-guards'

export function isAccountApiResponse(value: unknown): value is AccountApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isDecimalNumber(value.id) &&
    isOptionalString(value.nickname) &&
    ImageGuards.isOptionalImageWithOptimizedResponse(value.avatar)
  )
}
