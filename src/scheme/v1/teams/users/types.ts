import type { Scheme as RolesScheme } from '../roles'
import type { Scheme as TeamsScheme } from '../../teams/'

export type TeamsUsers = TeamsUsersItem[]
export type TeamsUsersDto = TeamsUsersItemDto[]

//
// Declare API datatypes
//

export interface TeamsUsersItemDto {
  id?: string
  nickname?: string
  is_intern?: boolean
  sort_order?: number
  is_vacation?: boolean
  user?: TeamsUsersUserDto | null
  teams?: TeamsScheme.TeamsApiResponse
  roles?: RolesScheme.TeamsRolesApiResponse
}

export interface TeamsUsersUserDto {
  id?: number
  avatar?: TeamsUsersUserAvatarImageDto
  nickname?: string
}

export interface TeamsUsersUserAvatarImageDto {
  preview?: string
  thumbnail?: string
  optimized?: {
    preview?: string
    thumbnail?: string
  }
}

//
// Declare metaform-api datatypes
//

export interface TeamsUsersItem {
  id?: string | null
  nickname: string | null
  isIntern: boolean | null
  sortOrder: number | null
  isVacation: boolean | null
  user: TeamsUsersUser | null
  teams: TeamsScheme.Teams | null
  roles: RolesScheme.TeamsRoles | null
}

export interface TeamsUsersUser {
  id: number | null
  avatar: TeamsUsersUserAvatarImage | null
  nickname: string | null
}

export interface TeamsUsersUserAvatarImage {
  preview: string | null
  thumbnail: string | null
  optimized?: {
    preview: string | null
    thumbnail: string | null
  }
}

//
// Define endpoint query params
// Since parameters can include multiple levels of nested property.property... structures, we will limit them to top-level parameters only
//

export interface TeamsUsersParams {
  include?: (
    | 'id'
    | 'nickname'
    | 'is_intern'
    | 'sort_order'
    | 'is_vacation'
    | 'user'
    | 'team'
    | 'roles'
  )[]
  exclude?: (
    | 'id'
    | 'nickname'
    | 'is_intern'
    | 'sort_order'
    | 'is_vacation'
    | 'user'
    | 'team'
    | 'roles'
  )[]
}
