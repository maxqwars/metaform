import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

// API

export type TeamsApiResponseItem = components['schemas']['models.teams.v1.team']
export type TeamsApiResponse = readonly TeamsApiResponseItem[]

// Domain

export interface TeamsItem {
  id: string | null
  title: string | null
  sortOrder: number | null
  description: string | null
}

export type Teams = TeamsItem[]

// Query params

export type TeamsFieldsPaths = NestedKeyOf<TeamsApiResponseItem>

export interface TeamsQueryParams {
  include?: TeamsFieldsPaths[]
  exclude?: TeamsFieldsPaths[]
}
