import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

export type RoleApiScheme = components['schemas']['models.teams.v1.team.role']

export interface Role {
  id: string | null
  title: string | null
  color: string | null
  sortOrder: number | null
}

export type RoleFieldsPaths = NestedKeyOf<RoleApiScheme>
