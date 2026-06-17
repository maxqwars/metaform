import type {
  MediaVideosDto,
  MediaVideos,
  MediaVideosItemImageDto,
  MediaVideosItemImageOptimizedDto,
  MediaVideosItemOriginDto,
  MediaVideoItemOriginTypeDto,
  MediaVideosItemImage,
  MediaVideosItemImageOptimized,
  MediaVideosItemOrigin,
  MediaVideoItemOriginType,
} from './types'

export function mapMediaVideoItemOriginTypeDto(
  dto: MediaVideoItemOriginTypeDto,
): MediaVideoItemOriginType {
  return {
    value: dto.value ?? null,
    description: dto.description ?? null,
  }
}

export function mapMediaVideosItemOriginDto(dto: MediaVideosItemOriginDto): MediaVideosItemOrigin {
  return {
    id: dto.id ?? null,
    url: dto.url ?? null,
    title: dto.title ?? null,
    description: dto.description ?? null,
    isAnnounce: dto.is_announce ?? null,
    type: dto.type ? mapMediaVideoItemOriginTypeDto(dto.type) : null,
  }
}

export function mapMediaVideosImageOptimizedDto(
  dto: MediaVideosItemImageOptimizedDto,
): MediaVideosItemImageOptimized {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
  }
}

export function mapMediaVideosImageDto(dto: MediaVideosItemImageDto): MediaVideosItemImage {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
    optimized: dto.optimized ? mapMediaVideosImageOptimizedDto(dto.optimized) : null,
  }
}

export function mapMediaVideosDto(dto: MediaVideosDto): MediaVideos {
  return dto.map((item) => ({
    id: item.id ?? null,
    url: item.url ?? null,
    title: item.title ?? null,
    views: item.views ?? null,
    comments: item.comments ?? null,
    videoId: item.video_id ?? null,
    createdAt: item.created_at ?? null,
    updatedAt: item.updated_at ?? null,
    isAnnounce: item.is_announce ?? null,
    image: item.image ? mapMediaVideosImageDto(item.image) : null,
    origin: item.origin ? mapMediaVideosItemOriginDto(item.origin) : null,
  }))
}
