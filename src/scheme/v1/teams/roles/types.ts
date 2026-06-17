export type TeamsRoles = TeamsRolesItem[]
export type TeamsRolesDto = TeamsRolesItemDto[]

export interface TeamsRolesParams {
  include?: ('id' | 'title' | 'color' | 'sort_order')[]
  exclude?: ('id' | 'title' | 'color' | 'sort_order')[]
}

export interface TeamsRolesItem {
  id: string | null
  title: string | null
  color: string | null
  sortOrder: number | null
}

export interface TeamsRolesItemDto {
  id?: string
  title?: string
  color?: string | null
  sort_order?: number
}
