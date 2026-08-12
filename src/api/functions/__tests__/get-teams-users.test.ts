import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import { getTeamsUsers } from '../get-teams-users'
import { versions } from '../../version-map'
import type { Transport } from '../../../transport/types'
import type { TeamsUsersParams } from '../../../scheme/v1/teams/users/types'

vi.mock('../../version-map', () => ({
  versions: {
    v1: {
      teamsUsers: {
        guard: vi.fn(),
        mapper: vi.fn(),
        serializeParams: vi.fn(),
        path: '/teams/users',
      },
    },
  },
}))

describe('Tests for getTeamsUsers API func', () => {
  const mockRequest = vi.fn()
  const mockTransport: Transport = {
    request: mockRequest,
  }

  const mockGuard = versions.v1.teamsUsers.guard as Mock
  const mockMapper = versions.v1.teamsUsers.mapper as Mock
  const mockSerializeParams = versions.v1.teamsUsers.serializeParams as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Success Scenarios', () => {
    it('should successfully fetch and map teams when params are provided', async () => {
      const inputParams: TeamsUsersParams = {
        include: ['id', 'is_intern', 'nickname'],
      }
      const serializedParams = { include: 'id,is_intern,nickname' }
      const rawData = [
        {
          id: 'bec3b4ad-16e4-4a79-9a7e-f43153e2fb2d',
          is_intern: false,
          nickname: 'nickname',
        },
      ]
      const mappedData = [
        {
          id: 'bec3b4ad-16e4-4a79-9a7e-f43153e2fb2d',
          isIntern: false,
          nickname: 'nickname',
        },
      ]

      mockSerializeParams.mockReturnValue(serializedParams)
      mockGuard.mockReturnValue(true)
      mockMapper.mockReturnValueOnce(mappedData)
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      const result = await getTeamsUsers(mockTransport, 'v1', inputParams)

      expect(mockSerializeParams).toHaveBeenCalledWith(inputParams)
      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams/users',
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
      mockRequest.mockResolvedValue({ ok: true, data: { data: rawData, status: 200, headers: {} } })

      await expect(getTeamsUsers(mockTransport, 'v1')).rejects.toThrow('Invalid response shape')

      expect(mockGuard).toHaveBeenCalledWith(rawData)
      expect(mockMapper).not.toHaveBeenCalled()
    })

    it('should throw MetaformTransportError when the transport layer reports a network error', async () => {
      const cause = new TypeError('Failed to fetch')
      mockRequest.mockResolvedValue({ ok: false, error: { kind: 'network', cause } })

      await expect(getTeamsUsers(mockTransport, 'v1')).rejects.toThrow('Transport error: network')
    })

    it('should propagate errors thrown during serialization', async () => {
      const serializeError = new Error('Serialization failed')
      mockSerializeParams.mockImplementation(() => {
        throw serializeError
      })

      await expect(getTeamsUsers(mockTransport, 'v1', { include: ['id'] })).rejects.toThrow(
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

      const result = await getTeamsUsers(mockTransport, 'v1', emptyParams)

      expect(mockRequest).toHaveBeenCalledWith({
        url: '/teams/users',
        method: 'GET',
        params: serializedParams,
      })
      expect(result).toEqual([])
    })
  })
})
