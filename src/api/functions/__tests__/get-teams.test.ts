import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { getTeams } from '../get-teams'
import { versions } from '../../version-map'
import type { Transport } from '../../../transport/types'
import type { TeamsParams } from '../../../scheme/v1/teams/types'

vi.mock('../../version-map', () => ({
  versions: {
    v1: {
      teams: {
        guard: vi.fn(),
        mapper: vi.fn(),
        serializeParams: vi.fn(),
        path: '/teams',
      },
    },
  },
}))

describe('getTeams', () => {
  const mockRequest = vi.fn()
  const mockTransport: Transport = {
    request: mockRequest,
  }

  const mockGuard = versions.v1.teams.guard as Mock
  const mockMapper = versions.v1.teams.mapper as Mock
  const mockSerializeParams = versions.v1.teams.serializeParams as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Success Scenarios', () => {
    it('should successfully fetch and map teams when params are provided', async () => {
      const inputParams: TeamsParams = {
        include: ['id', 'title'],
      }
      const serializedParams = { include: 'id,title' }
      const rawData = [{ id: '1', title: 'Team 1' }]
      const mappedData = [{ id: '1', title: 'Team 1', sortOrder: null, description: null }]

      mockSerializeParams.mockReturnValue(serializedParams)
      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValue(mappedData)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      const result = await getTeams(mockTransport, 'v1', inputParams)

      expect(mockSerializeParams).toHaveBeenCalledWith(inputParams)
      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams',
        method: 'GET',
        params: serializedParams,
      })
      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).toHaveBeenCalledWith(rawData)
      expect(result).toEqual(mappedData)
    })

    it('should successfully fetch and map teams when params are undefined', async () => {
      const rawData = [{ id: '2' }]
      const mappedData = [{ id: '2', title: null, sortOrder: null, description: null }]

      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValue(mappedData)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      const result = await getTeams(mockTransport, 'v1', undefined)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams',
        method: 'GET',
        params: undefined,
      })
      expect(mockSerializeParams).not.toHaveBeenCalled()
      expect(result).toEqual(mappedData)
    })
  })

  describe('Error Handling Scenarios', () => {
    it('should throw "Invalid response shape" if guard returns false', async () => {
      const rawData = { invalid: 'data' }

      mockGuard.mockReturnValue(false)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      await expect(getTeams(mockTransport, 'v1')).rejects.toThrow('Invalid response shape')

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).not.toHaveBeenCalled()
    })

    it('should throw MetaformTransportError when the transport layer reports a network error', async () => {
      const cause = new TypeError('Failed to fetch')
      mockRequest.mockResolvedValue({ ok: false, error: { kind: 'network', cause } })

      await expect(getTeams(mockTransport, 'v1')).rejects.toThrow('Transport error: network')
    })

    it('should propagate errors thrown during serialization', async () => {
      const serializeError = new Error('Serialization failed')
      mockSerializeParams.mockImplementation(() => {
        throw serializeError
      })

      await expect(getTeams(mockTransport, 'v1', { include: ['id'] })).rejects.toThrow(
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

      const result = await getTeams(mockTransport, 'v1', emptyParams)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams',
        method: 'GET',
        params: serializedParams,
      })
      expect(result).toEqual([])
    })
  })
})
