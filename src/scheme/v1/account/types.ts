import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'
import type { Image } from '@/scheme/v1'

export type AccountApiResponse = components['schemas']['models.teams.v1.team.user.account']

export interface Account {
  id: number | null
  nickname: string | null
  avatar: Image.scheme.ImageWithOptimized | null
}

export type AccountFieldsPaths = NestedKeyOf<AccountApiResponse>
