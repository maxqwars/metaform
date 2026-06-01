import {
  isNullableString,
  isOptionalString,
  isOptionalValidNumber,
  isValidOptionalString,
} from '../../../helpers/type-helpers'
import type { TeamsRolesItemDto, TeamsRolesDto } from './types'

export function isTeamsRolesItemDto(value: unknown): value is TeamsRolesItemDto {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const item = value as Record<string, unknown>

  return (
    isValidOptionalString(item.id) &&
    isOptionalString(item.title) &&
    isNullableString(item.color) &&
    isOptionalValidNumber(item.sort_order)
  )
}

export function isTeamsRolesDto(value: unknown): value is TeamsRolesDto {
  return Array.isArray(value) && value.every(isTeamsRolesItemDto)
}
