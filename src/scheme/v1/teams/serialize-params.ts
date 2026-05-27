import type { TeamsParams } from './types'

export function serializeTeamsParams(params: TeamsParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
