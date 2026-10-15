import type { components } from '@/generated/scheme.v1'
import type { scheme as Image } from '@/scheme/v1/image'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

export type PromotionApiResponse = components['schemas']['models.media.promotions.v1.promotion']

export interface PromotionType {
  id: string | null
  url: string | null
  urlLabel: string | null
  image: Image.ImageWithOptimized | null
  title: string | null
  description: string | null
  isAd: boolean | null
  adErid: string | null
  adOrigin: string | null
  release: null // TODO: Add after implementing release type
  hasOverlay: boolean | null
}

export type PromotionTypeFieldsPaths = NestedKeyOf<PromotionApiResponse>
