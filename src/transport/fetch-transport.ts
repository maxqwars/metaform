import type { Transport, RequestTransport, TransportResponse } from './types'

function resolvePath(url: string, pathParams?: Record<string, string>): string {
  if (!pathParams) return url
  return Object.entries(pathParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    url,
  )
}

export function createFetchTransport(baseUrl: string): Transport {
  return {
    async request<T>(req: RequestTransport): Promise<TransportResponse<T>> {
      const resolvedUrl = resolvePath(req.url, req.pathParams)
      const url = new URL(baseUrl + resolvedUrl)

      if (req.params) {
        Object.entries(req.params).forEach(([k, v]) => url.searchParams.set(k, v))
      }

      const response = await fetch(url, {
        method: req.method,
        headers: req.headers,
      })

      return {
        data: (await response.json()) as T,
        status: response.status,
        headers: Object.fromEntries(response.headers),
      }
    },
  }
}
