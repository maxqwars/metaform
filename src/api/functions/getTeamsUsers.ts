import type { Transport } from '../../transport/types'
import { unwrapTransportResult } from '../unwrap-transport-result'
import { MetaformInvalidResponseError } from '../../errors'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'

type TeamsUsersResult<V extends keyof VersionMap> = ReturnType<
  VersionMap[V]['teamsUsers']['mapper']
>

type TeamsUsersParams<V extends keyof VersionMap> = Parameters<
  VersionMap[V]['teamsUsers']['serializeParams']
>[0]

export async function getTeamsUsers<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: TeamsUsersParams<V>,
): Promise<TeamsUsersResult<V>> {
  const { guard, mapper, serializeParams, path } = versions[version].teamsUsers

  const result = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  const response = unwrapTransportResult(result)

  if (!guard(response.data)) {
    throw new MetaformInvalidResponseError('teams-users')
  }

  return mapper(response.data) as TeamsUsersResult<V>
}
