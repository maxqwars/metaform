import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createFetchTransport } from '../fetch-transport'
import type { RequestTransport } from '../types'

const mockFetch = vi.fn<typeof fetch>()
vi.stubGlobal('fetch', mockFetch)

describe('createFetchTransport', () => {
  const baseUrl = 'https://api.example.com'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should perform a basic GET request and return data', async () => {
    const mockResponseBody = { id: 1, name: 'Test' }

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponseBody),
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const request: RequestTransport = {
      url: '/endpoint',
      method: 'GET',
      headers: { Authorization: 'Bearer token' },
    }

    const result = await transport.request<typeof mockResponseBody>(request)

    expect(mockFetch).toHaveBeenCalledWith(new URL(baseUrl + request.url), {
      method: request.method,
      headers: request.headers,
    })
    expect(result).toEqual({
      ok: true,
      data: {
        data: mockResponseBody,
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    })
  })

  it('should resolve path parameters correctly', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
      status: 200,
      headers: new Headers(),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const request: RequestTransport = {
      url: '/users/{id}/posts/{postId}',
      method: 'GET',
      pathParams: {
        id: '123',
        postId: '456',
      },
    }

    await transport.request(request)

    const [input] = mockFetch.mock.calls[0]
    expect(input).toBeDefined()
    expect(input).toBeInstanceOf(URL)
    const calledUrl = input as URL
    expect(calledUrl.pathname).toBe('/users/123/posts/456')
  })

  it('should append query parameters to the URL', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
      status: 200,
      headers: new Headers(),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const request: RequestTransport = {
      url: '/search',
      method: 'GET',
      params: {
        q: 'vitest',
        page: '1',
      },
    }

    await transport.request(request)

    const [input] = mockFetch.mock.calls[0]
    expect(input).toBeDefined()
    expect(input).toBeInstanceOf(URL)
    const calledUrl = input as URL
    expect(calledUrl.searchParams.get('q')).toBe('vitest')
    expect(calledUrl.searchParams.get('page')).toBe('1')
  })

  it('should handle combined path and query parameters', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
      status: 200,
      headers: new Headers(),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const request: RequestTransport = {
      url: '/users/{id}',
      method: 'GET',
      pathParams: { id: '99' },
      params: { active: 'true' },
    }

    await transport.request(request)

    const [input] = mockFetch.mock.calls[0]
    expect(input).toBeDefined()
    expect(input).toBeInstanceOf(URL)
    const calledUrl = input as URL
    expect(calledUrl.pathname).toBe('/users/99')
    expect(calledUrl.searchParams.get('active')).toBe('true')
  })

  it('should return a network error result when fetch throws', async () => {
    const cause = new TypeError('Failed to fetch')
    mockFetch.mockRejectedValue(cause)

    const transport = createFetchTransport(baseUrl)
    const result = await transport.request({ url: '/endpoint', method: 'GET' })

    expect(result).toEqual({ ok: false, error: { kind: 'network', cause } })
  })

  it('should return a timeout error result when fetch aborts', async () => {
    mockFetch.mockRejectedValue(new DOMException('Aborted', 'AbortError'))

    const transport = createFetchTransport(baseUrl)
    const result = await transport.request({ url: '/endpoint', method: 'GET' })

    expect(result).toEqual({ ok: false, error: { kind: 'timeout' } })
  })

  it('should return a parse error result when the response body is not valid JSON', async () => {
    const cause = new SyntaxError('Unexpected token')
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.reject(cause),
      status: 200,
      headers: new Headers(),
    } as unknown as Response)

    const transport = createFetchTransport(baseUrl)
    const result = await transport.request({ url: '/endpoint', method: 'GET' })

    expect(result).toEqual({ ok: false, error: { kind: 'parse', cause } })
  })

  it('should return an http error result with the parsed body on non-2xx responses', async () => {
    const errorBody = { message: 'Not found' }
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve(errorBody),
      headers: new Headers(),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const result = await transport.request({ url: '/endpoint', method: 'GET' })

    expect(result).toEqual({ ok: false, error: { kind: 'http', status: 404, body: errorBody } })
  })

  it('should return an http error result with field errors on a 422 response', async () => {
    const errorBody = { message: 'Validation failed', errors: { login: ['required'] } }
    mockFetch.mockResolvedValue({
      ok: false,
      status: 422,
      json: () => Promise.resolve(errorBody),
      headers: new Headers(),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const result = await transport.request({ url: '/endpoint', method: 'GET' })

    expect(result).toEqual({ ok: false, error: { kind: 'http', status: 422, body: errorBody } })
  })
})
