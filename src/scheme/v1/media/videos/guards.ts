import type {
  MediaVideosDto,
  MediaVideosItemDto,
  MediaVideosItemImageDto,
  MediaVideosItemOriginDto,
  MediaVideoItemOriginTypeDto,
} from './types'

import {
  isPlainObject,
  isOptionalString,
  isOptional,
  isOptionalUUID,
  isOptionalBoolean,
  isOptionalDecimalNumber,
  isNullableOptional,
} from '@/helpers/type-guards'

export function isMediaVideosItemImageOptimizedDto(value: unknown): value is boolean {
  if (!isPlainObject(value)) return false
  return isOptionalString(value.preview) && isOptionalString(value.thumbnail)
}

export const isOptionalMediaVideosItemImageOptimizedDto = isOptional<boolean>(
  isMediaVideosItemImageOptimizedDto,
)

export function isMediaVideosItemImageDto(value: unknown): value is MediaVideosItemImageDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    isOptionalMediaVideosItemImageOptimizedDto(value.optimized),
  ]

  return checks.every(Boolean)
}

export const isNullableOptionalMediaVideosItemImageDto =
  isNullableOptional<MediaVideosItemImageDto>(isMediaVideosItemImageDto)

export function isMediaVideoItemOriginTypeDto(
  value: unknown,
): value is MediaVideoItemOriginTypeDto {
  if (!isPlainObject(value)) return false

  const checks = [isOptionalString(value.value), isOptionalString(value.description)]

  return checks.every(Boolean)
}

export const isOptionalMediaVideoItemOriginTypeDto = isOptional(isMediaVideoItemOriginTypeDto)

export function isMediaVideosItemOriginDto(value: unknown): value is MediaVideosItemOriginDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalUUID(value.id),
    isOptionalString(value.url),
    isOptionalString(value.title),
    isOptionalString(value.description),
    isOptionalMediaVideoItemOriginTypeDto(value.type),
    isOptionalBoolean(value.is_announce),
  ]

  return checks.every(Boolean)
}

export const isNullableOptionalMediaVideosItemOriginDto = isNullableOptional(
  isMediaVideosItemOriginDto,
)

export function isMediaVideosItemDto(value: unknown): value is MediaVideosItemDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalDecimalNumber(value.id),
    isOptionalString(value.url),
    isOptionalString(value.title),
    isOptionalDecimalNumber(value.views),
    isNullableOptionalMediaVideosItemImageDto(value.image),
    isOptionalDecimalNumber(value.comments),
    isOptionalString(value.video_id),
    isOptionalString(value.created_at),
    isOptionalString(value.updated_at),
    isOptionalBoolean(value.is_announce),
    isNullableOptionalMediaVideosItemOriginDto(value.origin),
  ]

  return checks.every(Boolean)
}

export function isMediaVideosDto(value: unknown): value is MediaVideosDto {
  return Array.isArray(value) && value.every(isMediaVideosItemDto)
}
