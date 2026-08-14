import type { AccountApiResponse, Account } from './types'
import { Mappers as ImageMappers } from '@/scheme/v1/image'

export function toAccount(dto: AccountApiResponse): Account {
  return {
    id: dto.id ?? null,
    nickname: dto.nickname ?? null,
    avatar: dto.avatar !== undefined ? ImageMappers.toImageWithOptimized(dto.avatar) : null,
  }
}
