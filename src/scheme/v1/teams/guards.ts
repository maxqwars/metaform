import type { TeamsItemDto, TeamsDto } from './types'

import {
  isPlainObject,
  isOptionalUUID,
  isOptionalDecimalNumber,
  isNullableString,
  isOptionalString,
} from '@/helpers/type-guards'

export function isTeamsItemDto(value: unknown): value is TeamsItemDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalUUID(value.id),
    isOptionalString(value.title),
    isOptionalDecimalNumber(value.sort_order),
    isNullableString(value.description),
  ]

  return checks.every(Boolean)
}

export function isTeamsDto(value: unknown): value is TeamsDto {
  return Array.isArray(value) && value.every(isTeamsItemDto)
}
