import type { TeamsRolesQueryParams } from './types'

export function serializeTeamsRolesQueryParams(
  params: TeamsRolesQueryParams,
): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
