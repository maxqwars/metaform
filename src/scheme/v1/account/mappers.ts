import type { AccountApiResponse, Account } from './types'
import { Image } from '@/scheme/v1'

export function toAccount(dto: AccountApiResponse): Account {
  return {
    id: dto.id ?? null,
    nickname: dto.nickname ?? null,
    avatar: dto.avatar !== undefined ? Image.mappers.toImageWithOptimized(dto.avatar) : null,
  }
}
