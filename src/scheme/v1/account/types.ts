import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'
import type { Scheme as ImageScheme } from '@/scheme/v1/image'

export type AccountApiResponse = components['schemas']['models.teams.v1.team.user.account']

export interface Account {
  id: number | null
  nickname: string | null
  avatar: ImageScheme.ImageWithOptimized
}

export type AccountFieldsPaths = NestedKeyOf<AccountApiResponse>
