import type * as ImageTypes from './types'

export function mapImageDto(dto: ImageTypes.ImageDto): ImageTypes.Image {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
    optimized: dto.optimized ? mapImageOptimizedDto(dto.optimized) : null,
  }
}

export function mapImageOptimizedDto(dto: ImageTypes.ImageOptimizedDto): ImageTypes.ImageOptimized {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
  }
}
