import type { ApiError, ApiErrorScheme } from './types'

export function toApiError(dto: ApiErrorScheme): ApiError {
  return {
    message: dto.message ?? null,
    fieldErrors: dto.errors ?? null,
  }
}
