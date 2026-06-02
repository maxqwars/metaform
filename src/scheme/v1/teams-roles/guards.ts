import {
  isNullableString,
  isOptionalString,
  isOptionalUuid,
  isOptionalValidNumber,
  isRecord,
} from '../../../helpers/type-helpers'
import type { TeamsRolesItemDto, TeamsRolesDto } from './types'

export function isTeamsRolesItemDto(value: unknown): value is TeamsRolesItemDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalUuid(value.id) &&
      isOptionalString(value.title) &&
      isNullableString(value.color) &&
      isOptionalValidNumber(value.sort_order),
  ]

  return checks.every(Boolean)
}

export function isTeamsRolesDto(value: unknown): value is TeamsRolesDto {
  return Array.isArray(value) && value.every(isTeamsRolesItemDto)
}
