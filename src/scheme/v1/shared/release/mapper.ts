import type * as ReleaseTypes from './types'

// export function mapReleaseDto(dto: ReleaseTypes.ReleaseDto): ReleaseTypes.Release {
//   throw Error('Not implemented')
// }

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
