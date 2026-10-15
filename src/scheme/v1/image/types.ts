import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

/*
 * re-import original scheme
 */
export type ImageApiScheme = components['schemas']['commons.v1.models.components.image']
export type ImageWithOptimizedApiScheme = components['schemas']['commons.v1.models.components.image.withOptimized']

/*
 * define metaform domain types
 */

export interface Image {
  preview: string | null
  thumbnail: string | null
}

export interface ImageWithOptimized extends Image {
  optimized: Image | null
}

export type ImageFieldsPaths = NestedKeyOf<ImageApiScheme>
export type ImageWithOptimizedFieldsPaths = NestedKeyOf<ImageWithOptimizedApiScheme>
