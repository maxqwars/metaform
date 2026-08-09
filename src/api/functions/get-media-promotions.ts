import type { Transport } from '@/transport/types'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'

type MediaPromotionsResult<V extends keyof VersionMap> = ReturnType<
  VersionMap[V]['mediaPromotions']['mapper']
>

type MediaPromotionsParams<V extends keyof VersionMap> = Parameters<
  VersionMap[V]['mediaPromotions']['serializeParams']
>[0]

export async function getMediaPromotions<V extends keyof VersionMap>(
  transport: Transport,
  version: V,
  params?: MediaPromotionsParams<V>,
): Promise<MediaPromotionsResult<V>> {
  const { guard, mapper, serializeParams, path } = versions[version].mediaPromotions

  const response = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  if (!guard(response.data)) {
    throw new Error('Invalid response shape')
  }

  return mapper(response.data) as MediaPromotionsResult<V>
}
