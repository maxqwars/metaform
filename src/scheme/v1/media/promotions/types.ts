import type { ImageType, ReleaseType } from '../../shared'

export type MediaPromotionsDto = MediaPromotionsItemDto[]
export type MediaPromotions = MediaPromotionsItem[]

// export interface MediaPromotionsParams {}````

// DTO

export interface MediaPromotionsItemDto {
  id?: string
  url?: string
  image?: ImageType.ImageTypes.ImageDto
  title?: string | null
  is_ad?: boolean
  ad_erid?: string | null
  ad_origin?: string | null
  url_label?: string
  has_overlay?: boolean
  release?: ReleaseType.ReleaseTypes.ReleaseDto
}

// Types

export interface MediaPromotionsItem {
  id: string | null
  url: string | null
  image: ImageType.ImageTypes.Image | null
  title: string | null
  isAd: boolean | null
  adErid: string | null
  adOrigin: string | null
  urlLabel: string | null
  hasOverlay: boolean | null
  release: ReleaseType.ReleaseTypes.Release
}
