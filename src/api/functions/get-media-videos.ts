import type { Transport } from '../../transport/types'
import { unwrapTransportResult } from '../unwrap-transport-result'
import { MetaformInvalidResponseError } from '../../errors'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'

type MediaVideosResult<V extends keyof VersionMap> = ReturnType<
  VersionMap[V]['mediaVideos']['mapper']
>

type MediaVideosParams<V extends keyof VersionMap> = Parameters<
  VersionMap[V]['mediaVideos']['serializeParams']
>[0]

export async function getMediaVideos<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: MediaVideosParams<V>,
): Promise<MediaVideosResult<V>> {
  const { guard, mapper, serializeParams, path } = versions[version].mediaVideos

  const result = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  const response = unwrapTransportResult(result)

  if (!guard(response.data)) {
    throw new MetaformInvalidResponseError('mediaVideos')
  }

  return mapper(response.data) as MediaVideosResult<V>
}
