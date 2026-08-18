import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

// API

export type ImageApiResponse = components['schemas']['commons.v1.models.components.image']
export type ImageWithOptimizedApiResponse =
  components['schemas']['commons.v1.models.components.image.withOptimized']

// Domain

export interface Image {
  preview: string | null
  thumbnail: string | null
}
export interface ImageWithOptimized extends Image {
  optimized: Image | null
}

// Fields

export type ImageFieldsPaths = NestedKeyOf<ImageApiResponse>
export type ImageWithOptimizedFieldsPaths = NestedKeyOf<ImageWithOptimizedApiResponse>
