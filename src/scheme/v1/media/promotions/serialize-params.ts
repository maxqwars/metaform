import type { MediaPromotionsParams } from './types'

export function serializeMediaPromotionsParams(
  params: MediaPromotionsParams,
): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
