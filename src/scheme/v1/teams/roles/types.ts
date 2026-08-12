import type { components } from '@/generated/scheme.v1'

/*
 * API Transport Layer
 */
export type TeamsRolesApiResponseItem = components['schemas']['models.teams.v1.team.role']
export type TeamsRolesApiResponse = readonly TeamsRolesApiResponseItem[]

/*
 * Domain Layer
 */
export interface TeamsRolesItem {
  id: string | null
  title: string | null
  color: string | null
  sortOrder: number | null
}

export type TeamsRoles = TeamsRolesItem[]

/*
 * Query Params
 */

export type TeamsRolesFields = keyof TeamsRolesApiResponseItem

export interface TeamsRolesQueryParams {
  include?: TeamsRolesFields[]
  exclude?: TeamsRolesFields[]
}
