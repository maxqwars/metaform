import type { ImageDto, ImageOptimizedDto } from './types'
import { isOptionalString, isRecord } from '../../../../helpers/type-helpers'

export function isImageDto(value: unknown): value is ImageDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    value.optimized === undefined || isImageOptimizedDto(value.optimized),
  ]

  return checks.every(Boolean)
}

export function isImageOptimizedDto(value: unknown): value is ImageOptimizedDto {
  if (!isRecord(value)) return false

  const checks = [isOptionalString(value.preview), isOptionalString(value.thumbnail)]

  return checks.every(Boolean)
}
