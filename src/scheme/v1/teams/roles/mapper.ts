import type {
  TeamsRoles,
  TeamsRolesApiResponse,
  TeamsRolesApiResponseItem,
  TeamsRolesItem,
} from './types'

export function mapTeamsRoleItemToDomain(item: TeamsRolesApiResponseItem): TeamsRolesItem {
  return {
    id: item.id ?? null,
    title: item.title ?? null,
    color: item.color ?? null,
    sortOrder: item.sort_order ?? null,
  }
}

export function mapTeamsRolesToDomain(dto: TeamsRolesApiResponse): TeamsRoles {
  return dto.map(mapTeamsRoleItemToDomain)
}
