import type * as ReleaseTypes from './types'

export function mapReleaseDto(dto: ReleaseTypes.ReleaseDto): ReleaseTypes.Release {
  return {
    id: dto.id ?? null,
    type: dto.type ? mapReleaseTypeDto(dto.type) : null,
    year: dto.year ?? null,
    name: dto.name ? mapReleaseNameDto(dto.name) : null,
    alias: dto.alias ?? null,
    season: dto.season ? mapReleaseSeasonDto(dto.season) : null,
    poster: dto.poster ? mapReleasePosterDto(dto.poster) : null,
    freshAt: dto.fresh_at ?? null,
    createdAt: dto.created_at ?? null,
    updatedAt: dto.updated_at ?? null,
    isOngoing: dto.is_ongoing ?? null,
    ageRating: dto.age_rating ? mapReleaseAgeRatingDto(dto.age_rating) : null,
    publishDay: dto.publish_day ? mapReleasePublishDateDto(dto.publish_day) : null,
    description: dto.description ?? null,
    notification: typeof dto.notification === 'boolean' ? dto.notification : null,
    episodesTotal: dto.episodes_total ?? null,
    externalPlayer: dto.external_player ?? null,
    isInProduction: typeof dto.is_in_production === 'boolean' ? dto.is_in_production : null,
    isBlockedByGeo: dto.is_blocked_by_geo ?? null,
    isBlockedByCopyrights: dto.is_blocked_by_copyrights ?? null,
    addedInUsersFavorites: dto.added_in_users_favorites ?? null,
    averageDurationOfEpisode: dto.average_duration_of_episode ?? null,
    addedInPlannedCollection: dto.added_in_planned_collection ?? null,
    addedInWatchedCollection: dto.added_in_watched_collection ?? null,
    addedInWatchingCollection: dto.added_in_watching_collection ?? null,
    addedInPostponedCollection: dto.added_in_postponed_collection ?? null,
    addedInAbandonedCollection: dto.added_in_abandoned_collection ?? null,
    genres: dto.genres ? dto.genres.map((item) => mapReleaseGenreItemDto(item)) : null,
  }
}

export function mapReleaseTypeDto(dto: ReleaseTypes.ReleaseTypeDto): ReleaseTypes.ReleaseType {
  return {
    value: dto.value ?? null,
    description: dto.description ?? null,
  }
}

export function mapReleaseNameDto(dto: ReleaseTypes.ReleaseNameDto): ReleaseTypes.ReleaseName {
  return {
    main: dto.main ?? null,
    english: dto.english ?? null,
    alternative: dto.alternative ?? null,
  }
}

export function mapReleaseSeasonDto(
  dto: ReleaseTypes.ReleaseSeasonDto,
): ReleaseTypes.ReleaseSeason {
  return {
    value: dto.value ?? null,
    description: dto.description ?? null,
  }
}

export function mapReleasePosterDto(
  dto: ReleaseTypes.ReleasePosterDto,
): ReleaseTypes.ReleasePoster {
  return {
    src: dto.src ?? null,
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
    optimized: dto.optimized ? mapReleasePosterOptimizedDto(dto.optimized) : null,
  }
}

export function mapReleasePosterOptimizedDto(
  dto: ReleaseTypes.ReleasePosterOptimizedDto,
): ReleaseTypes.ReleasePosterOptimized {
  return {
    src: dto.src ?? null,
    preview: dto.preview ?? null,
    thumbnail: dto.thumbnail ?? null,
  }
}

export function mapReleaseAgeRatingDto(
  dto: ReleaseTypes.ReleaseAgeRatingDto,
): ReleaseTypes.ReleaseAgeRating {
  return {
    value: dto.value ?? null,
    label: dto.label ?? null,
    isAdult: dto.is_adult ?? null,
    description: dto.description ?? null,
  }
}

export function mapReleasePublishDateDto(
  dto: ReleaseTypes.ReleasePublishDateDto,
): ReleaseTypes.ReleasePublishDate {
  return {
    value: dto.value ?? null,
    description: dto.description ?? null,
  }
}

export function mapReleaseGenreItemDto(
  dto: ReleaseTypes.ReleaseGenreItemDto,
): ReleaseTypes.ReleaseGenreItem {
  return {
    id: dto.id ?? null,
    name: dto.name ?? null,
    // TODO: add mapping of Image type from Image mapper once implemented
    image: null,
    totalReleases: dto.total_releases ?? null,
  }
}
