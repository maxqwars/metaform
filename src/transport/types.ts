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
