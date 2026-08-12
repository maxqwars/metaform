import type { TeamsRolesApiResponseItem, TeamsRolesApiResponse } from './types'
import {
  isOptional,
  isOptionalDecimalNumber,
  isOptionalString,
  isOptionalUUID,
  isPlainObject,
} from '@/helpers/type-guards'

export function isTeamsRolesApiResponseItem(value: unknown): value is TeamsRolesApiResponseItem {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalUUID(value.id),
    isOptionalString(value.title),
    isOptionalString(value.color),
    isOptionalDecimalNumber(value.sort_order),
  ]

  return checks.every(Boolean)
}

export function isTeamsRolesApiResponse(value: unknown): value is TeamsRolesApiResponse {
  return Array.isArray(value) && value.every(isTeamsRolesApiResponseItem)
}

export const isOptionalTeamsRolesApiResponse = isOptional(isTeamsRolesApiResponse)
