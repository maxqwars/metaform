import type { scheme } from '@/scheme/v1/error'
import type { TransportError } from '@/transport/types'

/** API error: the server responded with a non-2xx status and a recognized error body. */
export class MetaformApiError extends Error {
  readonly status: number
  readonly body: scheme.ApiError

  constructor(status: number, body: scheme.ApiError) {
    super(body.message ?? `API error with status ${String(status)}`)
    this.name = 'MetaformApiError'
    this.status = status
    this.body = body
  }
}

/** Error below the HTTP response level: network, timeout, parsing, or invalid response shape. */
export class MetaformTransportError extends Error {
  readonly cause: TransportError

  constructor(error: TransportError) {
    super(`Transport error: ${error.kind}`)
    this.name = 'MetaformTransportError'
    this.cause = error
  }
}

/** Server response failed the type guard for the expected domain schema. */
export class MetaformInvalidResponseError extends Error {
  constructor(context: string) {
    super(`Invalid response shape: ${context}`)
    this.name = 'MetaformInvalidResponseError'
  }
}
