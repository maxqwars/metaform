import type { Team, TeamApiResponse } from './types'

export function toTeam(dto: TeamApiResponse): Team {
  return {
    id: dto.id ?? null,
    title: dto.title ?? null,
    sortOrder: dto.sort_order ?? null,
    description: dto.description ?? null,
  }
}
