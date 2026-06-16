import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import { getMediaVideos } from '../get-media-videos'
import { versions } from '../../version-map'
import type { Transport } from '../../../transport/types'
import type { MediaVideosParams } from '../../../scheme/v1/media-videos'

vi.mock('../../version-map', () => ({
  versions: {
    v1: {
      mediaVideos: {
        guard: vi.fn(),
        mapper: vi.fn(),
        serializeParams: vi.fn(),
        path: '/media/videos',
      },
    },
  },
}))

describe('Tests for getMediaVideos API func', () => {
  const mockRequest = vi.fn()
  const mockTransport: Transport = {
    request: mockRequest,
  }

  const mockGuard = versions.v1.mediaVideos.guard as Mock
  const mockMapper = versions.v1.mediaVideos.mapper as Mock
  const mockSerializeParams = versions.v1.mediaVideos.serializeParams as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Success Scenarios', () => {
    it('should successfully fetch and map media videos when params are provided', async () => {
      const inputParams: MediaVideosParams = {
        limit: 10,
        include: ['title', 'url'],
      }
      const serializedParams = { limit: '10', include: 'title,url' }
      const rawData = [
        {
          id: 1,
          title: 'Sample Video',
          url: 'https://example.com/video',
        },
      ]
      const mappedData = [
        {
          id: 1,
          title: 'Sample Video',
          url: 'https://example.com/video',
        },
      ]

      mockSerializeParams.mockReturnValue(serializedParams)
      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValueOnce(mappedData)
      mockRequest.mockResolvedValue({ data: rawData, status: 200, headers: {} })

      const result = await getMediaVideos(mockTransport, 'v1', inputParams)

      expect(mockSerializeParams).toHaveBeenCalledWith(inputParams)
      expect(mockRequest).toHaveBeenCalledWith({
        url: '/media/videos',
        method: 'GET',
        params: serializedParams,
      })

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).toHaveBeenCalledWith(rawData)
      expect(result).toEqual(mappedData)
    })
  })

  describe('Error Handling Scenarios', () => {
    it('should throw "Invalid response shape" if guard returns false', async () => {
      const rawData = { invalid: 'data' }

      mockGuard.mockReturnValue(false)
      mockRequest.mockResolvedValue({ data: rawData, status: 200, headers: {} })

      await expect(getMediaVideos(mockTransport, 'v1')).rejects.toThrow('Invalid response shape')

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).not.toHaveBeenCalled()
    })

    it('should propagate errors thrown by the transport layer', async () => {
      const networkError = new Error('Network request failed')
      mockRequest.mockRejectedValue(networkError)

      await expect(getMediaVideos(mockTransport, 'v1')).rejects.toThrow('Network request failed')
    })

    it('should propagate errors thrown during serialization', async () => {
      const serializeError = new Error('Serialization failed')
      mockSerializeParams.mockImplementation(() => {
        throw serializeError
      })

      await expect(getMediaVideos(mockTransport, 'v1', { limit: 5 })).rejects.toThrow(
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
      mockRequest.mockResolvedValue({ data: [], status: 200, headers: {} })

      const result = await getMediaVideos(mockTransport, 'v1', emptyParams)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/media/videos',
        method: 'GET',
        params: serializedParams,
      })
      expect(result).toEqual([])
    })
  })
})
