import type { TeamsItemDto, TeamsDto } from './types'
import {
  isOptionalString,
  isNullableString,
  isOptionalValidNumber,
} from '../../../helpers/type-helpers.js'

export function isTeamsItemDto(value: unknown): value is TeamsItemDto {
  // Basic, value not object or null
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const item = value as Record<string, unknown>

  return (
    isOptionalString(item.id) &&
    isOptionalString(item.title) &&
    isOptionalValidNumber(item.sort_order) &&
    isNullableString(item.description)
  )
}

export function isTeamsDto(value: unknown): value is TeamsDto {
  return Array.isArray(value) && value.every(isTeamsItemDto)
}
