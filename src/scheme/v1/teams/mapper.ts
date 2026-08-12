import type { Teams, TeamsApiResponse, TeamsApiResponseItem, TeamsItem } from './types'

export function mapTeamsItemToDomain(item: TeamsApiResponseItem): TeamsItem {
  return {
    id: item.id ?? null,
    title: item.title ?? null,
    sortOrder: item.sort_order ?? null,
    description: item.description ?? null,
  }
}

export function mapTeamsToDomain(dto: TeamsApiResponse): Teams {
  return dto.map(mapTeamsItemToDomain)
}
