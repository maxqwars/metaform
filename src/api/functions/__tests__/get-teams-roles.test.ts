import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import { getTeamsRoles } from '../get-teams-roles'
import { versions } from '../../version-map'
import type { Transport } from '../../../transport/types'
import type { TeamsRolesParams } from '../../../scheme/v1'

vi.mock('../../version-map', () => ({
  versions: {
    v1: {
      teamsRoles: {
        guard: vi.fn(),
        mapper: vi.fn(),
        serializeParams: vi.fn(),
        path: '/teams/roles',
      },
    },
  },
}))

describe('getTeamsRoles', () => {
  const mockRequest = vi.fn()
  const mockTransport: Transport = {
    request: mockRequest,
  }

  const mockGuard = versions.v1.teamsRoles.guard as Mock
  const mockMapper = versions.v1.teamsRoles.mapper as Mock
  const mockSerializeParams = versions.v1.teamsRoles.serializeParams as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Success Scenarios', () => {
    it('should successfully fetch and map teams when params are provided', async () => {
      const inputParams: TeamsRolesParams = {
        include: ['id', 'title', 'color', 'sort_order'],
      }
      const serializedParams = { include: 'id,title,color' }
      const rawData = [
        {
          id: 'bec3b4ad-16e4-4a79-9a7e-f43153e2fb2d',
          title: 'Team leader',
          color: null,
          sort_order: 1,
        },
      ]
      const mappedData = [
        {
          id: 'bec3b4ad-16e4-4a79-9a7e-f43153e2fb2d',
          title: 'Team leader',
          color: null,
          sortOrder: 1,
        },
      ]

      mockSerializeParams.mockReturnValue(serializedParams)
      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValueOnce(mappedData)
      mockRequest.mockResolvedValue({ data: rawData, status: 200, headers: {} })

      const result = await getTeamsRoles(mockTransport, 'v1', inputParams)

      expect(mockSerializeParams).toHaveBeenCalledWith(inputParams)
      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams/roles',
        method: 'GET',
        params: serializedParams,
      })

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).toHaveBeenCalledWith(rawData)
      expect(result).toEqual(mappedData)
    })

    it('should successfully fetch and map teams when params are undefined', async () => {
      const rawData = [{ id: '2' }]
      const mappedData = [{ id: '2', title: null, sortOrder: null, color: null }]

      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValue(mappedData)
      mockRequest.mockResolvedValue({ data: rawData, status: 200, headers: {} })

      const result = await getTeamsRoles(mockTransport, 'v1', undefined)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams/roles',
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
      mockRequest.mockResolvedValue({ data: rawData, status: 200, headers: {} })

      await expect(getTeamsRoles(mockTransport, 'v1')).rejects.toThrow('Invalid response shape')

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).not.toHaveBeenCalled()
    })

    it('should propagate errors thrown by the transport layer', async () => {
      const networkError = new Error('Network request failed')
      mockRequest.mockRejectedValue(networkError)

      await expect(getTeamsRoles(mockTransport, 'v1')).rejects.toThrow('Network request failed')
    })

    it('should propagate errors thrown during serialization', async () => {
      const serializeError = new Error('Serialization failed')
      mockSerializeParams.mockImplementation(() => {
        throw serializeError
      })

      await expect(getTeamsRoles(mockTransport, 'v1', { include: ['id'] })).rejects.toThrow(
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

      const result = await getTeamsRoles(mockTransport, 'v1', emptyParams)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams/roles',
        method: 'GET',
        params: serializedParams,
      })
      expect(result).toEqual([])
    })
  })
})
