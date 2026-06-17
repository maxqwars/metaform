import type { TeamsRolesParams } from './types'

export function serializeTeamsRolesParams(params: TeamsRolesParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
