import type { ApiError, ApiErrorResponse } from './types'

export function toApiError(dto: ApiErrorResponse): ApiError {
  return {
    message: dto.message ?? null,
    fieldErrors: dto.errors ?? null,
  }
}
