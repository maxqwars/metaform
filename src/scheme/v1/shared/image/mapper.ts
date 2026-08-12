import type * as ImageTypes from './types'

export function toImage(dto: ImageTypes.ImageApiResponse): ImageTypes.Image {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
  }
}

export function toImageWithOptimized(
  dto: ImageTypes.ImageApiWithOptimizedResponse,
): ImageTypes.ImageWithOptimized {
  return {
    ...toImage(dto),
    optimized: dto.optimized ? toImage(dto.optimized) : null,
  }
}
