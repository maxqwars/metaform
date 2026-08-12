import type { Transport } from '../../transport/types'
import { unwrapTransportResult } from '../unwrap-transport-result'
import { MetaformInvalidResponseError } from '../../errors'
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

  const result = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  const response = unwrapTransportResult(result)

  if (!guard(response.data)) {
    throw new MetaformInvalidResponseError('teams')
  }

  return mapper(response.data) as TeamsResult<V>
}
