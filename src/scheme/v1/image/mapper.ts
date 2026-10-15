import type { ImageApiScheme, ImageWithOptimizedApiScheme, Image, ImageWithOptimized } from './types'

export function toImage(dto: ImageApiScheme): Image {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
  }
}

export function toImageWithOptimized(dto: ImageWithOptimizedApiScheme): ImageWithOptimized {
  return {
    ...toImage(dto),
    optimized: dto.optimized ? toImage(dto.optimized) : null,
  }
}
