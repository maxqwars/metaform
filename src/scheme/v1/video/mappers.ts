import type {
  VideoContent,
  VideoContentApiResponse,
  VideoOrigin,
  VideoOriginType,
  VideoOriginApiResponse,
  VideoOriginTypeApiResponse,
} from './types'
import { toImageWithOptimized } from '../image/mapper'

export function toVideoContent(dto: VideoContentApiResponse): VideoContent {
  return {
    id: dto.id ?? null,
    url: dto.url ?? null,
    title: dto.title ?? null,
    image: dto.image ? toImageWithOptimized(dto.image) : null,
    views: dto.views ?? null,
    comments: dto.comments ?? null,
    videoId: dto.video_id ?? null,
    createdAt: dto.created_at ? new Date(dto.created_at) : null,
    updatedAt: dto.updated_at ? new Date(dto.updated_at) : null,
    isAnnounce: dto.is_announce ?? null,
    origin: dto.origin ? toVideoOrigin(dto.origin) : null,
  }
}

export function toVideoOrigin(dto: VideoOriginApiResponse): VideoOrigin {
  return {
    id: dto.id ?? null,
    url: dto.url ?? null,
    type: dto.type ? toVideoOriginType(dto.type) : null,
    title: dto.title ?? null,
    description: dto.description ?? null,
    isAnnounce: dto.is_announce ?? null,
  }
}

export function toVideoOriginType(dto: VideoOriginTypeApiResponse): VideoOriginType {
  return {
    value: dto.value ?? null,
    description: dto.description ?? null,
  }
}
