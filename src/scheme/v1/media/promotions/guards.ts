import { Guards as ImageTypeGuards } from '../../shared/image'
import { Guards as ReleaseTypeGuards } from '../../shared/release'
import { isOptionalBoolean, isOptionalString, isRecord } from '../../../../helpers/type-helpers'

export function isMediaPromotionsItemDto(value: unknown): boolean {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalString(value.id),
    isOptionalString(value.url),
    value.image === undefined || value.image === null || ImageTypeGuards.isImageDto(value.image),
    isOptionalString(value.title),
    isOptionalBoolean(value.is_ad),
    isOptionalString(value.ad_erid),
    isOptionalString(value.ad_origin),
    isOptionalString(value.url_label),
    isOptionalBoolean(value.has_overlay),
    value.release === undefined ||
      value.release === null ||
      ReleaseTypeGuards.isReleaseDto(value.release),
  ]

  return checks.every(Boolean)
}

export function isMediaPromotionsDto(value: unknown): boolean {
  return Array.isArray(value) && value.every(isMediaPromotionsItemDto)
}
