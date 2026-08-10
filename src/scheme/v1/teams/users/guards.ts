import { Guards as RolesGuards } from '../roles'
import * as teamsGuards from '../guards'
import type {
  TeamsUsersDto,
  TeamsUsersItemDto,
  TeamsUsersUserAvatarImageDto,
  TeamsUsersUserDto,
} from './types'

import {
  isPlainObject,
  isOptionalString,
  isOptionalDecimalNumber,
  isOptionalUUID,
  isOptionalBoolean,
  isNullableOptional,
} from '@/helpers/type-guards'

const { isOptionalTeamsRolesDto } = RolesGuards
const { isOptionalTeamsDto } = teamsGuards

export function isTeamsUsersUserAvatarOptimizedDto(value: unknown): boolean {
  if (!isPlainObject(value)) return false

  return isOptionalString(value.preview) && isOptionalString(value.thumbnail)
}

export function isTeamsUsersUserAvatarImageDto(
  value: unknown,
): value is TeamsUsersUserAvatarImageDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalString(value.preview),
    isOptionalString(value.thumbnail),
    value.optimized === undefined || isTeamsUsersUserAvatarOptimizedDto(value.optimized),
  ]

  return checks.every(Boolean)
}

export function isTeamsUsersUserDto(value: unknown): value is TeamsUsersUserDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalDecimalNumber(value.id),
    value.avatar === undefined || isTeamsUsersUserAvatarImageDto(value.avatar),
    isOptionalString(value.nickname),
  ]

  return checks.every(Boolean)
}

const isNullableOptionalIsTeamsUsersDto = isNullableOptional(isTeamsUsersUserDto)

export function isTeamsUsersItemDto(value: unknown): value is TeamsUsersItemDto {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalUUID(value.id),
    isOptionalString(value.nickname),
    isOptionalBoolean(value.is_intern),
    isOptionalBoolean(value.is_vacation),
    isOptionalDecimalNumber(value.sort_order),
    isNullableOptionalIsTeamsUsersDto(value.user),
    isOptionalTeamsDto(value.team),
    isOptionalTeamsRolesDto(value.roles),
  ]

  return checks.every(Boolean)
}

export function isTeamsUsersDto(value: unknown): value is TeamsUsersDto {
  return Array.isArray(value) && value.every(isTeamsUsersItemDto)
}
