/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { components } from '@/generated/scheme.v1'
import type { NestedKeyOf } from '@/helpers/nestedKeyOf'
import type { scheme as Image } from '@/scheme/v1/image'

export type ReleaseApiScheme = components['schemas']['models.anime.releases.v1.release'] & { genres?: readonly components['schemas']['models.anime.genres.v1.genre'][] }
export type ReleaseTypeApiScheme = components['schemas']['models.anime.releases.v1.release.type']
export type ReleaseTypeValueApiScheme = components['schemas']['enums.anime.releases.release.type']
export type ReleaseNameApiScheme = components['schemas']['models.anime.releases.v1.release.name']
export type ReleaseSeasonApiScheme = components['schemas']['models.anime.releases.v1.release.season']
export type ReleaseAgeRatingApiScheme = components['schemas']['models.anime.releases.v1.release.ageRating']
export type ReleasePublishDayApiScheme = components['schemas']['models.anime.releases.v1.release.publishDay']

export interface ReleaseType {
  id: number | null
  type: ReleaseTypeType | null
  year: number | null
  bname: ReleaseNameType | null
  alias: string | null
  season: ReleaseSeasonType | null
  poster: Image.ImageWithOptimized | null
  freshAt: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  isOngoing: boolean | null
  ageRating: ReleaseAgeRatingType | null
  publishDay: ReleasePublishDayType | null
  description: string | null
  notification: boolean | null
  episodesTotal: number | null
  externalPlayer: string | null
  isInProduction: boolean | null
  isBlockedByGeo: boolean | null
  isBlockedByCopyrights: boolean | null
  addedInUsersFavories: boolean | null
  averageDurationOfEpisodes: number | null
  addedInPlannedCollection: number | null
  addedUnWatchedCollection: number | null
  addedInWathingCollection: number | null
  addedInPostponedCollection: number | null
  addedInAbandonedCollection: number | null
  genres: null // TODO: Implement scheme & type genres and add to release type
}

export interface ReleaseTypeType {
  value: ReleaseTypeValueType | null
  description: string | null
}

export type ReleaseTypeValueType = components['schemas']['enums.anime.releases.release.type']

export interface ReleaseNameType {
  // TODO: Implement scheme & type release name and add to release type
}

export interface ReleaseSeasonType {
  // TODO: Implement scheme & type release season and add to release type
}

export interface ReleaseAgeRatingType {
  // TODO: Implement scheme & type release age rating and add to release type
}

export interface ReleasePublishDayType {
  // TODO: Implement scheme & type release publish day and add to release type
}

export type ReleaseTypeFieldsPaths = NestedKeyOf<ReleaseApiScheme>
