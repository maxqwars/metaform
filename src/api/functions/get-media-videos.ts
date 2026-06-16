import type { Transport } from '../../transport/types'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'

type MediaVideosResult<V extends keyof VersionMap> = ReturnType<
  VersionMap[V]['mediaVideos']['mapper']
>

type MediaVideosParams<V extends keyof VersionMap> = Parameters<
  VersionMap[V]['mediaVideos']['serializeParams']
>[0]

export async function getTeamUsers<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: MediaVideosParams<V>,
): Promise<MediaVideosResult<V>> {
  const { guard, mapper, serializeParams, path } = versions[version].mediaVideos

  const response = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  if (!guard(response.data)) {
    throw new Error('Invalid response shape')
  }

  return mapper(response.data) as MediaVideosResult<V>
}
