import { Team, User, Role, Account } from '@/scheme/v1'
import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

/*
 * ⚠️ Fix for the OpenAPI schema: the user field of the responses.api.v1.teams.users object can be null, which was not defined in the schema.
 */
export type GetTeamsUsersApiResponseItem =
  components['schemas']['responses.api.v1.teams.users'][number] & {
    user?: components['schemas']['models.teams.v1.team.user.account'] | null
  }
export type GetTeamsUsersApiResponse = GetTeamsUsersApiResponseItem[]

export interface GetTeamsUsersResponseItem extends User.scheme.User {
  user: Account.scheme.Account | null
  team: Team.scheme.Team | null
  roles: Role.scheme.Role[] | null
}

export type GetTeamsUsersResponse = GetTeamsUsersResponseItem[]

export type GetTeamsUsersFields = NestedKeyOf<GetTeamsUsersApiResponseItem>

export interface GetTeamsUsersQueryParams {
  include?: GetTeamsUsersFields[]
  exclude?: GetTeamsUsersFields[]
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
  if (!Array.isArray(value)) return false

  return value.every((item: GetTeamsUsersApiResponseItem): boolean => {
    return (
      Team.guards.isOptionalTeamApiResponse(item.team) &&
      Account.guards.isNullableOptionalAccountApiResponse(item.user) &&
      (typeof item.roles !== 'undefined'
        ? item.roles.every((role) => Role.guards.isOptionalRoleResponse(role))
        : true)
    )
  })
}

export function toGetTeamsUsersResponseItem(
  dto: GetTeamsUsersApiResponseItem,
): GetTeamsUsersResponseItem {
  const UserFields = User.mappers.toUser(dto)

  return {
    ...UserFields,
    user: !dto.user ? null : Account.mappers.toAccount(dto.user),
    team: typeof dto.team !== 'undefined' ? Team.mappers.toTeam(dto.team) : null,
    roles:
      typeof dto.roles !== 'undefined' ? dto.roles.map((item) => Role.mappers.toRole(item)) : null,
  }
}

export function toGetTeamsUsersResponse(dto: GetTeamsUsersApiResponse): GetTeamsUsersResponse {
  return dto.map((value) => toGetTeamsUsersResponseItem(value))
}
