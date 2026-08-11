import type * as ReleaseTypes from './types'
import {
  isNullableOptional,
  isPlainObject,
  isOptionalString,
  isOptionalBoolean,
  isNullableString,
  isOptionalDecimalNumber,
} from '@/helpers/type-guards'

import { Guards as ImageGuards } from '../image'

export function isReleaseTypeDto(value: unknown): value is ReleaseTypes.ReleaseTypeDto {
  if (!isPlainObject(value)) return false

  return isOptionalString(value.value) && isOptionalString(value.description)
}

export function isReleaseNameDto(value: unknown): value is ReleaseTypes.ReleaseNameDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.main),
    isOptionalString(value.english),
    isNullableString(value.alternative),
  ]

  return checks.every(Boolean)
}

export function isReleaseSeasonDto(value: unknown): value is ReleaseTypes.ReleaseSeasonDto {
  if (!isPlainObject(value)) return false

  return isOptionalString(value.value) && isOptionalString(value.description)
}

export function isReleasePosterOptimizedDto(
  value: unknown,
): value is ReleaseTypes.ReleasePosterOptimizedDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.src),
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
  ]

  return checks.every(Boolean)
}

export function isReleasePosterDto(value: unknown): value is ReleaseTypes.ReleasePosterDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.src),
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    value.optimized === undefined || isReleasePosterOptimizedDto(value.optimized),
  ]

  return checks.every(Boolean)
}

export function isReleaseAgeRatingDto(value: unknown): value is ReleaseTypes.ReleaseAgeRatingDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.value),
    isOptionalString(value.label),
    isOptionalBoolean(value.is_adult),
    isOptionalString(value.description),
  ]

  return checks.every(Boolean)
}

export function isReleasePublishDateDto(
  value: unknown,
): value is ReleaseTypes.ReleasePublishDateDto {
  if (!isPlainObject(value)) return false

  return isOptionalDecimalNumber(value.value) && isOptionalString(value.description)
}

export function isReleaseGenreItemDto(value: unknown): value is ReleaseTypes.ReleaseGenreItemDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalDecimalNumber(value.id),
    isOptionalString(value.name),
    ImageGuards.isOptionalImage(value.image),
    isOptionalDecimalNumber(value.total_releases),
  ]

  return checks.every(Boolean)
}

export function isReleaseDto(value: unknown): value is ReleaseTypes.ReleaseDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalDecimalNumber(value.id),
    value.type === undefined || isReleaseTypeDto(value.type),
    isOptionalDecimalNumber(value.year),
    value.name === undefined || isReleaseNameDto(value.name),
    isOptionalString(value.alias),
    value.season === undefined || isReleaseSeasonDto(value.season),
    value.poster === undefined || isReleasePosterDto(value.poster),
    value.fresh_at === undefined || value.fresh_at instanceof Date,
    value.created_at === undefined || value.created_at instanceof Date,
    value.updated_at === undefined || value.updated_at instanceof Date,
    isOptionalBoolean(value.is_ongoing),
    value.age_rating === undefined || isReleaseAgeRatingDto(value.age_rating),
    value.publish_day === undefined || isReleasePublishDateDto(value.publish_day),
    isOptionalString(value.description),
    value.notification === undefined || value.notification === null,
    isOptionalDecimalNumber(value.episodes_total),
    value.external_player === undefined ||
      typeof value.external_player === 'string' ||
      typeof value.external_player === 'number',
    isOptionalBoolean(value.is_in_production),
    isOptionalBoolean(value.is_blocked_by_geo),
    isOptionalBoolean(value.is_blocked_by_copyrights),
    isOptionalDecimalNumber(value.added_in_users_favorites),
    isOptionalDecimalNumber(value.average_duration_of_episode),
    isOptionalDecimalNumber(value.added_in_planned_collection),
    isOptionalDecimalNumber(value.added_in_watched_collection),
    isOptionalDecimalNumber(value.added_in_watching_collection),
    isOptionalDecimalNumber(value.added_in_postponed_collection),
    isOptionalDecimalNumber(value.added_in_abandoned_collection),
    value.genres === undefined ||
      (Array.isArray(value.genres) && value.genres.every(isReleaseGenreItemDto)),
  ]

  return checks.every(Boolean)
}

export const isNullableOptionalReleaseDto = isNullableOptional(isReleaseDto)
