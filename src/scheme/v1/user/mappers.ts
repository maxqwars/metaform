import type { UserApiResponse, User } from './types'

export function toUser(dto: UserApiResponse): User {
  return {
    id: dto.id ?? null,
    nickname: dto.nickname ?? null,
    isIntern: dto.is_intern ?? null,
    isVacation: dto.is_vacation ?? null,
    sortOrder: dto.sort_order ?? null,
  }
}
