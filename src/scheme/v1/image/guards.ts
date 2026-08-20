import type { ImageApiResponse, ImageWithOptimizedApiResponse } from './types'
import {
  isNullableOptional,
  isPlainObject,
  isOptional,
  isNullableOptionalURLPath,
} from '@/helpers/type-guards'

export function isImageResponse(value: unknown): value is ImageWithOptimizedApiResponse {
  if (!isPlainObject(value)) return false
  return isNullableOptionalURLPath(value.preview) && isNullableOptionalURLPath(value.thumbnail)
}

export const isOptionalImageResponse = isOptional(isImageResponse)
export const isNullableOptionalImageResponse = isNullableOptional(isImageResponse)

export function isImageWithOptimizedResponse(value: unknown): value is ImageApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isNullableOptionalURLPath(value.preview) &&
    isNullableOptionalURLPath(value.thumbnail) &&
    isNullableOptionalImageResponse(value.optimized)
  )
}

export const isOptionalImageWithOptimizedResponse = isOptional(isImageWithOptimizedResponse)
export const isNullableOptionalImageWithOptimizedResponse = isNullableOptional(
  isImageWithOptimizedResponse,
)
