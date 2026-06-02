import {
  isOptionalString,
  isOptionalUuid,
  isOptionalValidNumber,
  isRecord,
} from '../../../helpers/type-helpers'
import { isTeamsRolesDto } from '../teams-roles'
import { isTeamsDto } from '../teams/guards'
import type {
  TeamsUsersDto,
  TeamsUsersItemDto,
  TeamsUsersUserAvatarImageDto,
  TeamsUsersUserDto,
} from './types'

function isTeamsUsersUserAvatarOptimizedDto(value: unknown): boolean {
  if (!isRecord(value)) return false

  return isOptionalString(value.preview) && isOptionalString(value.thumbnail)
}

function isTeamsUsersUserAvatarImageDto(value: unknown): value is TeamsUsersUserAvatarImageDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    value.optiomized === undefined || isTeamsUsersUserAvatarOptimizedDto(value.optiomized),
  ]

  return checks.every(Boolean)
}

function isTeamsUsersUserDto(value: unknown): value is TeamsUsersUserDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalValidNumber(value.id),
    value.avatar === undefined || isTeamsUsersUserAvatarImageDto(value.avatar),
    isOptionalString(value.nickname),
  ]

  return checks.every(Boolean)
}

export function isTeamsUsersItemDto(value: unknown): value is TeamsUsersItemDto {
  if (!isRecord(value)) return false

  const checks = [
    isOptionalUuid(value.id),
    isOptionalString(value.nickname),
    value.is_intern === undefined || typeof value.is_intern === 'boolean',
    value.is_vacation === undefined || typeof value.is_intern === 'boolean',
    isOptionalValidNumber(value.sort_order),
    value.user === undefined || value.user === null || isTeamsUsersUserDto(value.user),
    value.team === undefined || isTeamsDto(value.team),
    value.roles === undefined || isTeamsRolesDto(value.roles),
  ]

  return checks.every(Boolean)
}

export function isTeamsUsersDto(value: unknown): value is TeamsUsersDto {
  return Array.isArray(value) && value.every(isTeamsUsersItemDto)
}
