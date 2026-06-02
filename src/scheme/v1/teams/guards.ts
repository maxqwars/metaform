import type { TeamsItemDto, TeamsDto } from './types'
import {
  isOptionalString,
  isNullableString,
  isOptionalValidNumber,
  isOptionalUuid,
  isRecord,
} from '../../../helpers/type-helpers.js'

export function isTeamsItemDto(value: unknown): value is TeamsItemDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalUuid(value.id),
    isOptionalString(value.title),
    isOptionalValidNumber(value.sort_order),
    isNullableString(value.description),
  ]

  return checks.every(Boolean)
}

export function isTeamsDto(value: unknown): value is TeamsDto {
  return Array.isArray(value) && value.every(isTeamsItemDto)
}
