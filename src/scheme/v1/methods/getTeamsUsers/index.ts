import { Team, User, Role } from '@/scheme/v1'

export interface GetTeamsUsersApiResponseItem {
  user: User.scheme.UserApiResponse | null
  team: Team.scheme.TeamApiResponse
  roles: Role.scheme.RoleApiResponse[]
}

export type GetTeamsUsersApiResponse = GetTeamsUsersApiResponseItem[]

export interface GetTeamsUsersResponseItem {
  user: User.scheme.User | null
  team: Team.scheme.Team | null
  roles: Role.scheme.Role[] | null
}

export type GetTeamsUsersResponse = GetTeamsUsersResponseItem[]

export interface GetTeamsUsersQueryParams {
  include?: (Role.scheme.RoleFieldsPaths &
    Team.scheme.TeamFieldsPaths &
    User.scheme.UserFieldsPaths)[]
  exclude?: (Role.scheme.RoleFieldsPaths &
    Team.scheme.TeamFieldsPaths &
    User.scheme.UserFieldsPaths)[]
}

export function serializeGetTeamsUsersQueryParams(
  params: GetTeamsUsersQueryParams,
): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}

export function isGetTeamsUsersApiResponse(value: unknown): value is GetTeamsUsersApiResponse {
  return (
    Array.isArray(value) &&
    value.every((item: GetTeamsUsersApiResponseItem): boolean => {
      return (
        Team.guards.isOptionalTeamApiResponse(item.team) &&
        User.guards.isNullableOptionalUserApiResponse(item.user) &&
        item.roles.every((role) => Role.guards.isOptionalRoleResponse(role))
      )
    })
  )
}

export function toGetTeamsUsersResponseItem(
  dto: GetTeamsUsersApiResponseItem,
): GetTeamsUsersResponseItem {
  return {
    user: dto.user === null ? null : User.mappers.toUser(dto.user),
    team: typeof dto.team !== 'undefined' ? Team.mappers.toTeam(dto.team) : null,
    roles:
      typeof dto.roles !== 'undefined' ? dto.roles.map((item) => Role.mappers.toRole(item)) : null,
  }
}

export function toGetTeamsUsersResponse(dto: GetTeamsUsersApiResponse): GetTeamsUsersResponse {
  return dto.map((value) => toGetTeamsUsersResponseItem(value))
}
