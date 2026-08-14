import type {
  ImageApiResponse,
  ImageWithOptimizedApiResponse,
  Image,
  ImageWithOptimized,
} from './types'

export function toImage(dto: ImageApiResponse): Image {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
  }
}

export function toImageWithOptimized(dto: ImageWithOptimizedApiResponse): ImageWithOptimized {
  return {
    ...toImage(dto),
    optimized: dto.optimized ? toImage(dto.optimized) : null,
  }
}
