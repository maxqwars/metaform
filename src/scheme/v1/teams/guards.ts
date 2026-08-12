import type { TeamsApiResponseItem, TeamsApiResponse } from './types'

import {
  isPlainObject,
  isOptionalUUID,
  isOptionalDecimalNumber,
  isNullableString,
  isOptionalString,
  isOptional,
} from '@/helpers/type-guards'

export function isTeamsApiResponseItem(value: unknown): value is TeamsApiResponseItem {
  if (!isPlainObject(value)) return false

  const checks = [
    isOptionalUUID(value.id),
    isOptionalString(value.title),
    isOptionalDecimalNumber(value.sort_order),
    isNullableString(value.description),
  ]

  return checks.every(Boolean)
}

export function isTeamsApiResponse(value: unknown): value is TeamsApiResponse {
  return Array.isArray(value) && value.every(isTeamsApiResponseItem)
}

export const isOptionalTeamsDto = isOptional(isTeamsApiResponse)
