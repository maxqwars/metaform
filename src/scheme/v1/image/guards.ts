import type { ImageApiScheme, ImageWithOptimizedApiScheme } from './types'
import { isNullableOptional, isPlainObject, isOptional, isNullableOptionalURLPath } from '@/helpers/type-guards'

export function isImageApiScheme(value: unknown): value is ImageApiScheme {
  if (!isPlainObject(value)) return false
  return isNullableOptionalURLPath(value.preview) && isNullableOptionalURLPath(value.thumbnail)
}

export const isOptionalImageApiScheme = isOptional(isImageApiScheme)
export const isNullableOptionalImageApiScheme = isNullableOptional(isImageApiScheme)

export function isImageWithOptimizedApiScheme(value: unknown): value is ImageWithOptimizedApiScheme {
  if (!isPlainObject(value)) return false

  return isNullableOptionalURLPath(value.preview) && isNullableOptionalURLPath(value.thumbnail) && isNullableOptionalImageApiScheme(value.optimized)
}

export const isOptionalImageWithOptimizedApiScheme = isOptional(isImageWithOptimizedApiScheme)
export const isNullableOptionalImageWithOptimizedApiScheme = isNullableOptional(isImageWithOptimizedApiScheme)
