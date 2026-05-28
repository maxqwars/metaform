import type { TeamsRoles, TeamsRolesDto } from './types'

export function mapTeamsRolesDto(dto: TeamsRolesDto): TeamsRoles {
  return dto.map((item) => ({
    id: item.id ?? null,
    title: item.title ?? null,
    color: item.color ?? null,
    sortOrder: item.sort_order ?? null,
  }))
}
