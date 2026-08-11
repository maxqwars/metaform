import { Guards as ImageTypeGuards } from '../../shared/image'
import { Guards as ReleaseTypeGuards } from '../../shared/release'
import { isPlainObject, isOptionalString, isOptionalBoolean } from '@/helpers/type-guards'

export function isMediaPromotionsItemDto(value: unknown): boolean {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.id),
    isOptionalString(value.url),
    ImageTypeGuards.isNullableOptionalImageDto(value.image),
    isOptionalString(value.title),
    isOptionalBoolean(value.is_ad),
    isOptionalString(value.ad_erid),
    isOptionalString(value.ad_origin),
    isOptionalString(value.url_label),
    isOptionalBoolean(value.has_overlay),
    ReleaseTypeGuards.isNullableOptionalReleaseDto(value.release),
  ]

  return checks.every(Boolean)
}

export function isMediaPromotionsDto(value: unknown): boolean {
  return Array.isArray(value) && value.every(isMediaPromotionsItemDto)
}
