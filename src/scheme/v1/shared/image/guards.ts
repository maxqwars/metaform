import type { ImageDto, ImageOptimizedDto } from './types'
import {
  isNullableOptional,
  isPlainObject,
  isOptionalString,
  isOptional,
} from '@/helpers/type-guards'

export function isImageOptimizedDto(value: unknown): value is ImageOptimizedDto {
  if (!isPlainObject(value)) return false

  const checks = [isOptionalString(value.preview), isOptionalString(value.thumbnail)]

  return checks.every(Boolean)
}

export const isOptionalImageOptimizedDto = isOptional(isImageOptimizedDto)

export function isImageDto(value: unknown): value is ImageDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    isOptionalImageOptimizedDto(value.optimized),
  ]

  return checks.every(Boolean)
}

export const isOptionalImage = isOptional(isImageDto)

export const isNullableOptionalImageDto = isNullableOptional(isImageDto)
