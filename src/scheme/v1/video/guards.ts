import { isOptionalString, isPlainObject, isOptional, isOptionalDecimalNumber, isOptionalBoolean, isOptionalDateOrTimestamp } from '@/helpers/type-guards'
import { isImageWithOptimizedApiScheme } from '../image/guards'
import type { VideoContentApiScheme, VideoOriginApiScheme, VideoOriginTypeApiScheme, VideoOriginTypeEnumApiScheme } from './types'

export function isVideoContentApiScheme(value: unknown): value is VideoContentApiScheme {
  if (!isPlainObject(value)) {
    return false
  }

  return (
    isOptionalDecimalNumber(value.id) &&
    isOptionalString(value.url) &&
    isOptionalString(value.title) &&
    isOptionalDecimalNumber(value.views) &&
    isImageWithOptimizedApiScheme(value.image) &&
    isOptionalDecimalNumber(value.comments) &&
    isOptionalString(value.video_id) &&
    isOptionalDateOrTimestamp(value.created_at) &&
    isOptionalDateOrTimestamp(value.updated_at) &&
    isOptionalBoolean(value.is_announce) &&
    isVideoOriginApiScheme(value.origin)
  )
}

export const isOptionalVideoContentApiScheme = isOptional(isVideoContentApiScheme)

export function isVideoOriginApiScheme(value: unknown): value is VideoOriginApiScheme {
  if (!isPlainObject(value)) {
    return false
  }

  return (
    isOptionalString(value.id) &&
    isOptionalString(value.url) &&
    isOptionalVideosOriginTypeApiScheme(value.type) &&
    isOptionalString(value.title) &&
    isOptionalString(value.description) &&
    isOptionalBoolean(value.is_announce)
  )
}

export function isVideosOriginTypeApiScheme(value: unknown): value is VideoOriginTypeApiScheme {
  if (!isPlainObject(value)) {
    return false
  }

  return isOptionalVideoOriginTypeEnumApiScheme(value.value) && isOptionalString(value.description)
}

export const isOptionalVideosOriginTypeApiScheme = isOptional(isVideosOriginTypeApiScheme)

export function isVideoOriginTypeEnumApiScheme(value: unknown): value is VideoOriginTypeEnumApiScheme {
  if (!isPlainObject(value)) {
    return false
  }

  const obj = value as Record<string, string>
  return typeof obj.value === 'string' && obj.value === 'YOUTUBE_PLAYLIST'
}

export const isOptionalVideoOriginTypeEnumApiScheme = isOptional(isVideoOriginTypeEnumApiScheme)
