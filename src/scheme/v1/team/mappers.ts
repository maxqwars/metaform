import type { Team, TeamApiScheme } from './types'

export function toTeam(dto: TeamApiScheme): Team {
  return {
    id: dto.id ?? null,
    title: dto.title ?? null,
    sortOrder: dto.sort_order ?? null,
    description: dto.description ?? null,
  }
}
