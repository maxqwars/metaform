import { Role } from '@/scheme/v1'

export type GetTeamsRolesApiResponse = Role.scheme.RoleApiScheme[]
export type GetTeamsRolesResponse = Role.scheme.Role[]

export interface GetTeamsRolesQueryParams {
  include?: Role.scheme.RoleFieldsPaths[]
  exclude?: Role.scheme.RoleFieldsPaths[]
}

export function serializeGetTeamsRolesQueryParams(params: GetTeamsRolesQueryParams): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
  }
}

export function isGetTeamsRolesApiScheme(value: unknown): value is GetTeamsRolesApiResponse {
  return Array.isArray(value) && value.every(Role.guards.isRoleApiScheme)
}

export function toGetTeamsRoles(dto: GetTeamsRolesApiResponse): GetTeamsRolesResponse {
  return dto.map((value) => Role.mappers.toRole(value))
}
