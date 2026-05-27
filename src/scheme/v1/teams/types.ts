export type Teams = TeamsItem[]
export type TeamsDto = TeamsItemDto[]

export interface TeamsParams {
  include?: ('id' | 'title' | 'sort_order' | 'description')[]
  exclude?: ('id' | 'title' | 'sort_order' | 'description')[]
}

export interface TeamsItem {
  id: string | null
  title: string | null
  sortOrder: number | null
  description: string | null
}

export interface TeamsItemDto {
  id?: string
  title?: string
  sort_order?: number
  description?: string | null
}
