import type { ImageApiResponse, ImageApiWithOptimizedResponse } from './types'
import {
  isNullableOptional,
  isPlainObject,
  isOptional,
  isOptionalURLPath,
} from '@/helpers/type-guards'

export function isImageResponse(value: unknown): value is ImageApiWithOptimizedResponse {
  if (!isPlainObject(value)) return false
  return isOptionalURLPath(value.preview) && isOptionalURLPath(value.thumbnail)
}

export const isOptionalImageResponse = isOptional(isImageResponse)
export const isNullableOptionalImageResponse = isNullableOptional(isImageResponse)

export function isImageWithOptimizedResponse(value: unknown): value is ImageApiResponse {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalURLPath(value.preview),
    isOptionalURLPath(value.thumbnail),
    isOptionalImageResponse(value.optimized),
  ]

  return checks.every(Boolean)
}

export const isOptionalImageWithOptimizedResponse = isOptional(isImageWithOptimizedResponse)
export const isNUllableOptionalImageWithOptimizedResponse = isNullableOptional(
  isImageWithOptimizedResponse,
)
