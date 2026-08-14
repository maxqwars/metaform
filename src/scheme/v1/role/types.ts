import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

/*
 * API Transport Layer
 */
export type RoleApiResponse = components['schemas']['models.teams.v1.team.role']

/*
 * Domain Layer
 */
export interface Role {
  id: string | null
  title: string | null
  color: string | null
  sortOrder: number | null
}

/*
 * Query Params
 */

export type RoleFieldsPaths = NestedKeyOf<RoleApiResponse>
