import type { Scheme as ImageScheme } from '../image'

const _ReleaseTopLevelProperties = [
  'id',
  'type',
  'year',
  'name',
  'alias',
  'season',
  'poster',
  'fresh_at',
  'created_at',
  'updated_at',
  'is_ongoing',
  'age_rating',
  'publish_day',
  'description',
  'notification',
  'episodes_total',
  'external_player',
  'is_in_production',
  'is_blocked_by_geo',
  'is_blocked_by_copyrights',
  'added_in_users_favorites',
  'average_duration_of_episode',
  'added_in_planned_collection',
  'added_in_watched_collection',
  'added_in_watching_collection',
  'added_in_postponed_collection',
  'added_in_abandoned_collection',
  'genres',
] as const

type ReleaseTopLevelProp = (typeof _ReleaseTopLevelProperties)[number]

export interface ReleaseParams {
  include?: ReleaseTopLevelProp[]
  exclude?: ReleaseTopLevelProp[]
}

export interface ReleaseDto {
  id?: number
  type?: ReleaseTypeDto
  year?: number
  name?: ReleaseNameDto
  alias?: string
  season?: ReleaseSeasonDto
  poster?: ReleasePosterDto
  fresh_at?: string
  created_at?: string
  updated_at?: string
  is_ongoing?: boolean
  age_rating?: ReleaseAgeRatingDto
  publish_day?: ReleasePublishDateDto
  description?: string
  notification?: string
  episodes_total?: number
  external_player?: string
  is_in_production?: boolean
  is_blocked_by_geo?: boolean
  is_blocked_by_copyrights?: boolean
  added_in_users_favorites?: number
  average_duration_of_episode?: number
  added_in_planned_collection?: number
  added_in_watched_collection?: number
  added_in_watching_collection?: number
  added_in_postponed_collection?: number
  added_in_abandoned_collection?: number
  genres?: ReleaseGenreItemDto[]
}

export interface ReleaseTypeDto {
  value?: string
  description?: string
}

export interface ReleaseNameDto {
  main?: string
  english?: string
  alternative?: string | null
}

export interface ReleaseSeasonDto {
  value?: string
  description?: string
}

export interface ReleasePosterDto {
  src?: string
  preview?: string
  thumbnail?: string
  optimized?: ReleasePosterOptimizedDto
}

export interface ReleasePosterOptimizedDto {
  src?: string
  preview?: string
  thumbnail?: string
}

export interface ReleaseAgeRatingDto {
  value?: string
  label?: string
  is_adult?: boolean
  description?: string
}

export interface ReleasePublishDateDto {
  value?: number
  description?: string
}

export interface ReleaseGenreItemDto {
  id?: number
  name?: string
  image?: ImageScheme.ImageDto
  total_releases?: number
}

export interface Release {
  id: number | null
  type: ReleaseType | null
  year: number | null
  name: ReleaseName | null
  alias: string | null
  season: ReleaseSeason | null
  poster: ReleasePoster | null
  freshAt: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  isOngoing: boolean | null
  ageRating: ReleaseAgeRating | null
  publishDay: ReleasePublishDate | null
  description: string | null
  notification: boolean | null
  episodesTotal: number | null
  externalPlayer: string | number | null
  isInProduction: boolean | null
  isBlockedByGeo: boolean | null
  isBlockedByCopyrights: boolean | null
  addedInUsersFavorites: number | null
  averageDurationOfEpisode: number | null
  addedInPlannedCollection: number | null
  addedInWatchedCollection: number | null
  addedInWatchingCollection: number | null
  addedInPostponedCollection: number | null
  addedInAbandonedCollection: number | null
  genres: ReleaseGenreItem[] | null
}

export interface ReleaseType {
  value: string | null
  description: string | null
}

export interface ReleaseName {
  main: string | null
  english: string | null
  alternative: string | null
}

export interface ReleaseSeason {
  value: string | null
  description: string | null
}

export interface ReleasePoster {
  src: string | null
  preview: string | null
  thumbnail: string | null
  optimized: ReleasePosterOptimized | null
}

export interface ReleasePosterOptimized {
  src: string | null
  preview: string | null
  thumbnail: string | null
}

export interface ReleaseAgeRating {
  value: string | null
  label: string | null
  isAdult: boolean | null
  description: string | null
}

export interface ReleasePublishDate {
  value: number | null
  description: string | null
}

export interface ReleaseGenreItem {
  id: number | null
  name: string | null
  image: ImageScheme.Image | null
  totalReleases: number | null
}
