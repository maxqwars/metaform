import { mappers } from '@/scheme/v1/error'
import type { scheme } from '@/scheme/v1/error'
import { MetaformApiError, MetaformTransportError } from '@/errors'
import type { TransportResponse, TransportResult } from '@/transport/types'

/**
 * Unwraps TransportResult into response data or throws a typed
 * domain error (MetaformApiError for HTTP errors with a recognized body,
 * MetaformTransportError for network/timeout/parse errors and HTTP errors
 * with an unrecognized body).
 */
export function unwrapTransportResult<T>(result: TransportResult<T>): TransportResponse<T> {
  if (result.ok) return result.data

  const { error } = result

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (error.kind === 'http' && mappers.toApiError(error.body as scheme.ApiErrorResponse)) {
    throw new MetaformApiError(
      error.status,
      mappers.toApiError(error.body as scheme.ApiErrorResponse),
    )
  }

  throw new MetaformTransportError(error)
}
