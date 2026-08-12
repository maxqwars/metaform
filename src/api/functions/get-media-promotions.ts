import type { Transport } from '@/transport/types'
import type { VersionMap } from '../version-map'
import { versions } from '../version-map'
import { MetaformInvalidResponseError } from '../../errors'
import { unwrapTransportResult } from '../unwrap-transport-result'

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

  const result = await transport.request({
    url: path,
    method: 'GET',
    params: params ? serializeParams(params) : undefined,
  })

  const response = unwrapTransportResult(result)

  if (!guard(response.data)) {
    throw new MetaformInvalidResponseError('mediaPromotions')
  }

  return mapper(response.data) as MediaPromotionsResult<V>
}
