import type { Transport } from '../../transport/types'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'

type TeamsRolesResult<V extends keyof VersionMap> = ReturnType<
  VersionMap[V]['teamsRoles']['mapper']
>

type TeamsRolesParams<V extends keyof VersionMap> = Parameters<
  VersionMap[V]['teamsRoles']['serializeParams']
>[0]

export async function getTeamsRoles<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: TeamsRolesParams<V>,
): Promise<TeamsRolesResult<V>> {
  const { guard, mapper, serializeParams, path } = versions[version].teamsRoles

  const response = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  if (!guard(response.data)) {
    throw new Error('Invalid response shape')
  }

  return mapper(response.data) as TeamsRolesResult<V>
}
