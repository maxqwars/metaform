import { isNullableString, isOptionalNumber, isOptionalString } from '../../../helpers/type-helpers'
import type { TeamsRolesItemDto, TeamsRolesDto } from './types'

export function isTeamsRoleItemDto(value: unknown): value is TeamsRolesItemDto {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const item = value as Record<string, unknown>

  return (
    isOptionalNumber(item.id) &&
    isOptionalString(item.title) &&
    isNullableString(item.color) &&
    isOptionalNumber(item.sort_order)
  )
}

export function isTeamsRolesDto(value: unknown): value is TeamsRolesDto {
  return Array.isArray(value) && value.every(isTeamsRoleItemDto)
}
