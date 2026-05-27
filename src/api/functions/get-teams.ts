// api/functions/get-teams.ts
import type { Transport } from '../../transport/types'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'

type TeamsResult<V extends keyof VersionMap> = ReturnType<VersionMap[V]['teams']['mapper']>

type TeamsParams<V extends keyof VersionMap> = Parameters<
  VersionMap[V]['teams']['serializeParams']
>[0]

export async function getTeams<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: TeamsParams<V>,
): Promise<TeamsResult<V>> {
  const { guard, mapper, serializeParams, path } = versions[version].teams

  const response = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  if (!guard(response.data)) {
    throw new Error('Invalid response shape')
  }

  return mapper(response.data) as TeamsResult<V>
}
