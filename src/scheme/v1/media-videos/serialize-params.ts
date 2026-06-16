import type { MediaVideosParams } from './types'

export function serializeMediaVideosParams(params: MediaVideosParams): Record<string, string> {
  return {
    ...(params.limit !== undefined && { limit: String(params.limit) }),
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
