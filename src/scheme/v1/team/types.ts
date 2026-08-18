import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

export type TeamApiResponse = components['schemas']['models.teams.v1.team']

export interface Team {
  id: string | null
  title: string | null
  sortOrder: number | null
  description: string | null
}

export type TeamFieldsPaths = NestedKeyOf<TeamApiResponse>
