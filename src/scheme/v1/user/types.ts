import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'

export type UserApiResponse = components['schemas']['models.teams.v1.team.user']

export interface User {
  id: string | null
  nickname: string | null
  isIntern: boolean | null
  sortOrder: number | null
  isVacation: boolean | null
}

export type UserFieldsPaths = NestedKeyOf<UserApiResponse>
