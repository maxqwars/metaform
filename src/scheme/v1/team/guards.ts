import type { TeamApiResponse } from './types'
import {
  isNullableString,
  isOptionalDecimalNumber,
  isOptionalString,
  isOptionalUUID,
  isPlainObject,
  isOptional,
} from '@/helpers/type-guards'

export function isTeamApiResponse(value: unknown): value is TeamApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isOptionalUUID(value.id) &&
    isOptionalString(value.title) &&
    isOptionalDecimalNumber(value.sort_order) &&
    isNullableString(value.description)
  )
}

export const isOptionalTeamApiResponse = isOptional(isTeamApiResponse)
