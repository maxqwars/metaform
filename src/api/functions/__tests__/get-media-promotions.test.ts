import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import { getMediaPromotions } from '../get-media-promotions'
import { versions } from '../../version-map'
import type { Transport } from '../../../transport/types'
import type { MediaPromotionsParams } from '../../../scheme/v1/media/promotions/types'

vi.mock('../../version-map', () => ({
  versions: {
    v1: {
      mediaPromotions: {
        guard: vi.fn(),
        mapper: vi.fn(),
        serializeParams: vi.fn(),
        path: '/media/promotions',
      },
    },
  },
}))

describe('Tests for getMediaPromotions API func', () => {
  const mockRequest = vi.fn()
  const mockTransport: Transport = {
    request: mockRequest,
  }

  const mockGuard = versions.v1.mediaPromotions.guard as Mock
  const mockMapper = versions.v1.mediaPromotions.mapper as Mock
  const mockSerializeParams = versions.v1.mediaPromotions.serializeParams as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Success Scenarios', () => {
    it('should successfully fetch and map media promotions when params are provided', async () => {
      const inputParams: MediaPromotionsParams = {
        include: ['id', 'url', 'title'],
      }
      const serializedParams = { include: 'id,url,title' }
      const rawData = [
        {
          id: '1',
          url: 'https://example.com/promo',
          title: 'Sample Promotion',
          is_ad: true,
        },
      ]
      const mappedData = [
        {
          id: '1',
          url: 'https://example.com/promo',
          title: 'Sample Promotion',
          isAd: true,
        },
      ]

      mockSerializeParams.mockReturnValue(serializedParams)
      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValueOnce(mappedData)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      const result = await getMediaPromotions(mockTransport, 'v1', inputParams)

      expect(mockSerializeParams).toHaveBeenCalledWith(inputParams)
      expect(mockRequest).toHaveBeenCalledWith({
        url: '/media/promotions',
        method: 'GET',
        params: serializedParams,
      })

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).toHaveBeenCalledWith(rawData)
      expect(result).toEqual(mappedData)
    })

    it('should successfully fetch and map media promotions without params', async () => {
      const rawData = [{ id: '2', url: 'https://example.com/promo2' }]
      const mappedData = [{ id: '2', url: 'https://example.com/promo2' }]

      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValueOnce(mappedData)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      const result = await getMediaPromotions(mockTransport, 'v1')

      expect(mockSerializeParams).not.toHaveBeenCalled()
      expect(mockRequest).toHaveBeenCalledWith({
        url: '/media/promotions',
        method: 'GET',
        params: undefined,
      })
      expect(result).toEqual(mappedData)
    })
  })

  describe('Error Handling Scenarios', () => {
    it('should throw "Invalid response shape" if guard returns false', async () => {
      const rawData = { invalid: 'data' }

      mockGuard.mockReturnValue(false)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      await expect(getMediaPromotions(mockTransport, 'v1')).rejects.toThrow(
        'Invalid response shape',
      )

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).not.toHaveBeenCalled()
    })

    it('should throw MetaformTransportError when the transport layer reports a network error', async () => {
      const cause = new TypeError('Failed to fetch')
      mockRequest.mockResolvedValue({ ok: false, error: { kind: 'network', cause } })

      await expect(getMediaPromotions(mockTransport, 'v1')).rejects.toThrow(
        'Transport error: network',
      )
    })

    it('should throw MetaformApiError when the transport layer reports a recognized API error body', async () => {
      const errorBody = { message: 'Not found' }
      mockRequest.mockResolvedValue({
        ok: false,
        error: { kind: 'http', status: 404, body: errorBody },
      })

      await expect(getMediaPromotions(mockTransport, 'v1')).rejects.toThrow('Not found')
    })

    it('should propagate errors thrown during serialization', async () => {
      const serializeError = new Error('Serialization failed')
      mockSerializeParams.mockImplementation(() => {
        throw serializeError
      })

      await expect(getMediaPromotions(mockTransport, 'v1', { include: ['id'] })).rejects.toThrow(
        'Serialization failed',
      )

      expect(mockRequest).not.toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty params object', async () => {
      const emptyParams = {}
      const serializedParams = {}

      mockSerializeParams.mockReturnValue(serializedParams)
      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValue([])
      mockRequest.mockResolvedValue({ ok: true, data: { data: [], status: 200, headers: {} } })

      const result = await getMediaPromotions(mockTransport, 'v1', emptyParams)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/media/promotions',
        method: 'GET',
        params: serializedParams,
      })
      expect(result).toEqual([])
    })
  })
})
