/* eslint-disable @typescript-eslint/no-unused-vars */
import { isOptionalString, isPlainObject, isOptional } from '@/helpers/type-guards'
import type {
  VideoContentApiResponse,
  VideoOriginApiResponse,
  VideoOriginTypeApiResponse,
  VideoOriginTypeEnumApiResponse,
} from './types'

// TODO: Implement isVideoContentApiResponse typeguard
export function isVideoContentApiResponse(value: unknown): value is VideoContentApiResponse {
  throw Error('Not implemented')
}

// TODO: Implement isVideoOriginApiResponse typeguard
export function isVideoOriginApiResponse(value: unknown): value is VideoOriginApiResponse {
  throw Error('Not implemented')
}

export function isVideosOriginTypeApiResponse(value: unknown): value is VideoOriginTypeApiResponse {
  if (!isPlainObject(value)) {
    return false
  }

  return (
    isOptionalVideoOriginTypeEnumApiResponse(value.value) && isOptionalString(value.description)
  )
}

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
