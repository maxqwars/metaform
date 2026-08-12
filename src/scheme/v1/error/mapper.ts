import type { ApiErrorBody, ApiErrorDto } from './types'

export function toApiErrorBody(dto: ApiErrorDto): ApiErrorBody {
  return {
    message: dto.message ?? null,
    fieldErrors: dto.errors ?? null,
  }
}
