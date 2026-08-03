import type { MediaPromotionsDto, MediaPromotions } from './types'

import { ImageMappers } from '../../shared/image'
import { ReleaseMappers } from '../../shared/release'

export function mapMediaPromotionsDto(dto: MediaPromotionsDto): MediaPromotions {
  return dto.map((item) => ({
    id: item.id ?? null,
    url: item.url ?? null,
    image: item.image ? ImageMappers.mapImageDto(item.image) : null,
    title: item.title ?? null,
    isAd: item.is_ad ?? null,
    adErid: item.ad_erid ?? null,
    adOrigin: item.ad_origin ?? null,
    urlLabel: item.url_label ?? null,
    hasOverlay: item.has_overlay ?? null,
    release: item.release ? ReleaseMappers.mapReleaseDto(item.release) : null,
  }))
}
