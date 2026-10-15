import type { components } from '@/generated/scheme.v1'
import type { scheme as Image } from '@/scheme/v1/image'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

export type VideoContentApiScheme = components['schemas']['models.media.videos.v1.video.content'] & {
  origin?: components['schemas']['models.media.videos.v1.video.origin']
}
export type VideoOriginApiScheme = components['schemas']['models.media.videos.v1.video.origin']
export type VideoOriginTypeApiScheme = components['schemas']['models.media.videos.v1.video.origin.type']
export type VideoOriginTypeEnumApiScheme = components['schemas']['enums.media.videos.video.origin.type']

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

export type VideoContentFieldsPaths = keyof NestedKeyOf<VideoContentApiScheme>

export interface VideoOrigin {
  id: string | null
  url: string | null
  type: VideoOriginType | null
  title: string | null
  description: string | null
  isAnnounce: boolean | null
}

export type VideoOriginFieldsPaths = NestedKeyOf<VideoOriginApiScheme>

export interface VideoOriginType {
  value: VideoOriginTypeEnumApiScheme | null
  description: string | null
}

export type VideoOriginTypeFieldsPaths = NestedKeyOf<VideoOriginTypeApiScheme>
