import type { components } from '@/generated/scheme.v1'
import type { scheme as Image } from '@/scheme/v1/image'

/*
 * Responses types
 */

export type VideoContentApiResponse = components['schemas']['models.media.videos.v1.video.content']
export type VideoOriginApiResponse = components['schemas']['models.media.videos.v1.video.origin']
export type VideoOriginTypeApiResponse =
  components['schemas']['models.media.videos.v1.video.origin.type']
export type VideoOriginTypeEnumApiResponse =
  components['schemas']['enums.media.videos.video.origin.type']

/*
 * Metaform domain types
 */

export interface VideoContent {
  id: number | null
  url: string | null
  title: string | null
  views: number | null
  image: Image.ImageWithOptimized | null
  comments: number | null
  videoId: string | null
  createdAt: Date | null
  updatedAt: Date | null
  isAnnounce: boolean | null
  origin: VideoOrigin | null
}

export interface VideoOrigin {
  id: string | null
  url: string | null
  type: VideoOriginType | null
  title: string | null
  description: string | null
  isAnnounce: boolean | null
}

export interface VideoOriginType {
  value: VideoOriginTypeEnumApiResponse | null
  description: string | null
}
