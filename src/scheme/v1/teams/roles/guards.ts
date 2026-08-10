import type { TeamsRolesItemDto, TeamsRolesDto } from './types'
import {
  isNullableString,
  isOptional,
  isOptionalDecimalNumber,
  isOptionalString,
  isOptionalUUID,
  isPlainObject,
} from '@/helpers/type-guards'

export function isTeamsRolesItemDto(value: unknown): value is TeamsRolesItemDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalUUID(value.id),
    isOptionalString(value.title),
    isNullableString(value.color),
    isOptionalDecimalNumber(value.sort_order),
  ]

  return checks.every(Boolean)
}

export function isTeamsRolesDto(value: unknown): value is TeamsRolesDto {
  return Array.isArray(value) && value.every(isTeamsRolesItemDto)
}

export const isOptionalTeamsRolesDto = isOptional(isTeamsRolesDto)
