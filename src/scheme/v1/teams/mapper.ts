import type { Teams, TeamsDto } from './types'

export function mapTeamsDto(dto: TeamsDto): Teams {
  return dto.map((item) => ({
    id: item.id ?? null,
    title: item.title ?? null,
    sortOrder: item.sort_order ?? null,
    description: item.description ?? null,
  }))
}
