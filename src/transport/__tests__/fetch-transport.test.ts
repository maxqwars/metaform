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
    const mockResponse = {
      data: { id: 1, name: 'Test' },
      status: 200,
      headers: { 'content-type': 'application/json' },
    }

    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockResponse.data),
      status: mockResponse.status,
      headers: new Headers(mockResponse.headers),
    } as Response)

    const transport = createFetchTransport(baseUrl)
    const request: RequestTransport = {
      url: '/endpoint',
      method: 'GET',
      headers: { Authorization: 'Bearer token' },
    }

    const response = await transport.request<typeof mockResponse.data>(request)

    expect(mockFetch).toHaveBeenCalledWith(new URL(baseUrl + request.url), {
      method: request.method,
      headers: request.headers,
    })
    expect(response).toEqual(mockResponse)
  })

  it('should resolve path parameters correctly', async () => {
    mockFetch.mockResolvedValue({
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
})
