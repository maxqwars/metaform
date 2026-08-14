import type { TeamApiResponse } from './types'
import {
  isNullableString,
  isOptionalDecimalNumber,
  isOptionalString,
  isOptionalUUID,
  isPlainObject,
} from '@/helpers/type-guards'

export function isTeamResponse(value: unknown): value is TeamApiResponse {
  if (!isPlainObject(value)) return false

  return (
    isOptionalUUID(value.id) &&
    isOptionalString(value.title) &&
    isOptionalDecimalNumber(value.sort_order) &&
    isNullableString(value.description)
  )
}
