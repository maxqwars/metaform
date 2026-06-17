import { teamsMappers } from '../'
import { rolesMappers } from '../roles'
import type {
  TeamsUsers,
  TeamsUsersDto,
  TeamsUsersUser,
  TeamsUsersUserDto,
  TeamsUsersUserAvatarImage,
  TeamsUsersUserAvatarImageDto,
} from './types'

const { mapTeamsDto } = teamsMappers
const { mapTeamsRolesDto } = rolesMappers

export function mapTeamsUsersUserAvatarImageDto(
  dto: TeamsUsersUserAvatarImageDto,
): TeamsUsersUserAvatarImage {
  return {
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
    optimized: dto.optimized
      ? {
          preview: dto.optimized.preview ?? null,
          thumbnail: dto.optimized.thumbnail ?? null,
        }
      : undefined,
  }
}

export function mapTeamsUsersUserDto(dto: TeamsUsersUserDto): TeamsUsersUser {
  return {
    id: dto.id ?? null,
    nickname: dto.nickname ?? null,
    avatar: dto.avatar ? mapTeamsUsersUserAvatarImageDto(dto.avatar) : null,
  }
}

export function mapTeamsUsersDto(dto: TeamsUsersDto): TeamsUsers {
  return dto.map((item) => ({
    id: item.id ?? null,
    nickname: item.nickname ?? null,
    isIntern: item.is_intern ?? null,
    sortOrder: item.sort_order ?? null,
    isVacation: item.is_vacation ?? null,
    user: item.user ? mapTeamsUsersUserDto(item.user) : null,
    roles: item.roles ? mapTeamsRolesDto(item.roles) : null,
    teams: item.teams ? mapTeamsDto(item.teams) : null,
  }))
}
