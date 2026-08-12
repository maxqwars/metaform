import type { Transport, RequestTransport, TransportResult } from './types'

function resolvePath(url: string, pathParams?: Record<string, string>): string {
  if (!pathParams) return url
  return Object.entries(pathParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    url,
  )
}

export function createFetchTransport(baseUrl: string): Transport {
  return {
    async request<T>(req: RequestTransport): Promise<TransportResult<T>> {
      const resolvedUrl = resolvePath(req.url, req.pathParams)
      const url = new URL(baseUrl + resolvedUrl)

      if (req.params) {
        Object.entries(req.params).forEach(([k, v]) => url.searchParams.set(k, v))
      }

      let response: Response

      /*
       * Common fetch errors: timeout, error while net request
       */
      try {
        response = await fetch(url, {
          method: req.method,
          headers: req.headers,
        })
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === 'AbortError') {
          return { ok: false, error: { kind: 'timeout' } }
        }
        return { ok: false, error: { kind: 'network', cause } }
      }

      /*
       * JSON parse and API specific errors
       */
      let data: unknown
      try {
        data = await response.json()
      } catch (cause) {
        return { ok: false, error: { kind: 'parse', cause } }
      }

      if (!response.ok) {
        return { ok: false, error: { kind: 'http', status: response.status, body: data } }
      }

      return {
        ok: true,
        data: {
          data: data as T,
          status: response.status,
          headers: Object.fromEntries(response.headers),
        },
      }
    },
  }
}
