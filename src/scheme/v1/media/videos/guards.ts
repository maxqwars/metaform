import {
  isOptionalString,
  isOptionalValidNumber,
  isOptionalUuid,
  isRecord,
} from '../../../../helpers/type-helpers'
import type {
  MediaVideosDto,
  MediaVideosItemDto,
  MediaVideosItemImageDto,
  MediaVideosItemOriginDto,
  MediaVideoItemOriginTypeDto,
} from './types'

export function isMediaVideosItemImageOptimizedDto(value: unknown): boolean {
  if (!isRecord(value)) return false

  return isOptionalString(value.preview) && isOptionalString(value.thumbnail)
}

export function isMediaVideosItemImageDto(value: unknown): value is MediaVideosItemImageDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    value.optimized === undefined || isMediaVideosItemImageOptimizedDto(value.optimized),
  ]

  return checks.every(Boolean)
}

export function isMediaVideoItemOriginTypeDto(
  value: unknown,
): value is MediaVideoItemOriginTypeDto {
  if (!isRecord(value)) return false

  const checks = [isOptionalString(value.value), isOptionalString(value.description)]

  return checks.every(Boolean)
}

export function isMediaVideosItemOriginDto(value: unknown): value is MediaVideosItemOriginDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalUuid(value.id),
    isOptionalString(value.url),
    isOptionalString(value.title),
    isOptionalString(value.description),
    value.type === undefined || isMediaVideoItemOriginTypeDto(value.type),
    value.is_announce === undefined || typeof value.is_announce === 'boolean',
  ]

  return checks.every(Boolean)
}

export function isMediaVideosItemDto(value: unknown): value is MediaVideosItemDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalValidNumber(value.id),
    isOptionalString(value.url),
    isOptionalString(value.title),
    isOptionalValidNumber(value.views),
    value.image === undefined || value.image === null || isMediaVideosItemImageDto(value.image),
    isOptionalValidNumber(value.comments),
    isOptionalString(value.video_id),
    isOptionalString(value.created_at),
    isOptionalString(value.updated_at),
    value.is_announce === undefined || typeof value.is_announce === 'boolean',
    value.origin === undefined || value.origin === null || isMediaVideosItemOriginDto(value.origin),
  ]

  return checks.every(Boolean)
}

export function isMediaVideosDto(value: unknown): value is MediaVideosDto {
  return Array.isArray(value) && value.every(isMediaVideosItemDto)
}
