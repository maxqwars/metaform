import type { TeamsUsersParams } from './types'

export function serializeTeamsRolesParams(params: TeamsUsersParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
