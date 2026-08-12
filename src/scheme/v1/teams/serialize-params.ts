import type { TeamsQueryParams } from './types'

export function serializeTeamsQueryParams(params: TeamsQueryParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
