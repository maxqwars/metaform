import { Team } from '@/scheme/v1/'

export type GetTeamsApiResponse = Team.scheme.TeamApiScheme[]
export type GetTeamsResponse = Team.scheme.Team[]

export interface GetTeamsQueryParams {
  include?: Team.scheme.TeamFieldsPaths[]
  exclude?: Team.scheme.TeamFieldsPaths[]
}

export function isGetTeamsApiScheme(value: unknown): value is GetTeamsApiResponse {
  return Array.isArray(value) && value.every(Team.guards.isTeamApiScheme)
}

export function toGetTeams(dto: GetTeamsApiResponse): GetTeamsResponse {
  return dto.map((value) => Team.mappers.toTeam(value))
}

export function serializeGetTeamsQueryParams(params: GetTeamsQueryParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}
