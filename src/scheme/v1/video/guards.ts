import {
  isOptionalString,
  isPlainObject,
  isOptional,
  isOptionalDecimalNumber,
  isOptionalBoolean,
  isOptionalDateOrTimestamp,
} from '@/helpers/type-guards'
import { isImageWithOptimizedResponse } from '../image/guards'
import type {
  VideoContentApiResponse,
  VideoOriginApiResponse,
  VideoOriginTypeApiResponse,
  VideoOriginTypeEnumApiResponse,
} from './types'

export function isVideoContentApiResponse(value: unknown): value is VideoContentApiResponse {
  if (!isPlainObject(value)) {
    return false
  }

  return (
    isOptionalDecimalNumber(value.id) &&
    isOptionalString(value.url) &&
    isOptionalString(value.title) &&
    isOptionalDecimalNumber(value.views) &&
    isImageWithOptimizedResponse(value.image) &&
    isOptionalDecimalNumber(value.comments) &&
    isOptionalString(value.video_id) &&
    isOptionalDateOrTimestamp(value.created_at) &&
    isOptionalDateOrTimestamp(value.updated_at) &&
    isOptionalBoolean(value.is_announce) &&
    isVideoOriginApiResponse(value.origin)
  )
}

export const isOptionalVideoContentApiResponse = isOptional(isVideoContentApiResponse)

export function isVideoOriginApiResponse(value: unknown): value is VideoOriginApiResponse {
  if (!isPlainObject(value)) {
    return false
  }

  return (
    isOptionalString(value.id) &&
    isOptionalString(value.url) &&
    isOptionalVideoOriginTypeApiResponse(value.type) &&
    isOptionalString(value.title) &&
    isOptionalString(value.description) &&
    isOptionalBoolean(value.is_announce)
  )
}

export function isVideosOriginTypeApiResponse(value: unknown): value is VideoOriginTypeApiResponse {
  if (!isPlainObject(value)) {
    return false
  }

  return (
    isOptionalVideoOriginTypeEnumApiResponse(value.value) && isOptionalString(value.description)
  )
}

export const isOptionalVideoOriginTypeApiResponse = isOptional(isVideosOriginTypeApiResponse)

export function isVideoOriginTypeEnumApiResponse(
  value: unknown,
): value is VideoOriginTypeEnumApiResponse {
  if (!isPlainObject(value)) {
    return false
  }

  const obj = value as Record<string, string>
  return typeof obj.value === 'string' && obj.value === 'YOUTUBE_PLAYLIST'
}

export const isOptionalVideoOriginTypeEnumApiResponse = isOptional(isVideoOriginTypeEnumApiResponse)
