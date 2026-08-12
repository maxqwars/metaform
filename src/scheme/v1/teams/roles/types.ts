import type { components } from '@/generated/scheme.v1'

export type TeamsRolesItemDto = components['schemas']['responses.api.v1.teams.roles']
export type TeamsRolesDto = TeamsRolesItemDto[]

export type TeamsRoleField = keyof TeamsRolesItem

export type TeamsRoles = TeamsRolesItem[]
export interface TeamsRolesItem {
  id: string | null
  title: string | null
  color: string | null
  sortOrder: number | null
}

export interface TeamsRolesParams {
  include?: TeamsRoleField[]
  exclude?: TeamsRoleField[]
}
