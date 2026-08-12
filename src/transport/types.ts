export interface RequestTransport {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: Record<string, string>
  headers?: Record<string, string>
  pathParams?: Record<string, string>
}

export interface TransportResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface Transport {
  request<T>(req: RequestTransport): Promise<TransportResponse<T>>
}

/**
 * Transport-level error. The transport layer is unaware of the specific
 * API's error body format — for kind: 'api', the body is passed as unknown
 * and parsed by the domain layer (see scheme/v1/error).
 */
export type TransportError =
  | { kind: 'network'; cause: unknown }
  | { kind: 'timeout' }
  | { kind: 'parse'; cause: unknown }
  | { kind: 'api'; status: number; body: unknown }

export type TransportResult<T> =
  | { ok: true; data: TransportResponse<T> }
  | { ok: false; error: TransportError }

export interface Transport {
  request<T>(req: RequestTransport): Promise<TransportResult<T>>
}
