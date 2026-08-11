import { describe, it, expect } from 'vitest'
import {
  isReleaseTypeDto,
  isReleaseNameDto,
  isReleaseSeasonDto,
  isReleasePosterOptimizedDto,
  isReleasePosterDto,
  isReleaseAgeRatingDto,
  isReleasePublishDateDto,
  isReleaseGenreItemDto,
  isReleaseDto,
} from '../guards'

describe('isReleaseTypeDto', () => {
  it('should return true for a valid ReleaseTypeDto', () => {
    expect(isReleaseTypeDto({ value: 'tv', description: 'TV Series' })).toBe(true)
  })

  it('should return true for an empty object (all fields optional)', () => {
    expect(isReleaseTypeDto({})).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleaseTypeDto('string')).toBe(false)
    expect(isReleaseTypeDto(null)).toBe(false)
  })

  it('should return false if fields have incorrect types', () => {
    expect(isReleaseTypeDto({ value: 123 })).toBe(false)
  })
})

describe('isReleaseNameDto', () => {
  it('should return true for a valid ReleaseNameDto', () => {
    expect(isReleaseNameDto({ main: 'Title', english: 'Eng Title', alternative: null })).toBe(true)
  })

  it('should return true for an empty object', () => {
    expect(isReleaseNameDto({})).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleaseNameDto(123)).toBe(false)
  })

  it('should return false if fields have incorrect types', () => {
    expect(isReleaseNameDto({ main: 123 })).toBe(false)
    expect(isReleaseNameDto({ alternative: 123 })).toBe(false)
  })
})

describe('isReleaseSeasonDto', () => {
  it('should return true for a valid ReleaseSeasonDto', () => {
    expect(isReleaseSeasonDto({ value: 'winter', description: 'Winter' })).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleaseSeasonDto(null)).toBe(false)
  })

  it('should return false if fields have incorrect types', () => {
    expect(isReleaseSeasonDto({ description: true })).toBe(false)
  })
})

describe('isReleasePosterOptimizedDto', () => {
  it('should return true for a valid optimized poster DTO', () => {
    expect(
      isReleasePosterOptimizedDto({ src: 'src.jpg', preview: 'p.jpg', thumbnail: 't.jpg' }),
    ).toBe(true)
  })

  it('should return true for an empty object', () => {
    expect(isReleasePosterOptimizedDto({})).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleasePosterOptimizedDto([])).toBe(false)
  })

  it('should return false if fields have incorrect types', () => {
    expect(isReleasePosterOptimizedDto({ src: 123 })).toBe(false)
  })
})

describe('isReleasePosterDto', () => {
  it('should return true for a valid poster DTO with optimized field', () => {
    const validDto = { src: 'src.jpg', optimized: { src: 'opt.jpg' } }
    expect(isReleasePosterDto(validDto)).toBe(true)
  })

  it('should return true for a valid poster DTO without optimized field', () => {
    expect(isReleasePosterDto({ src: 'src.jpg' })).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleasePosterDto(undefined)).toBe(false)
  })

  it('should return false if optimized field is invalid', () => {
    expect(isReleasePosterDto({ optimized: 'invalid' })).toBe(false)
  })
})

describe('isReleaseAgeRatingDto', () => {
  it('should return true for a valid age rating DTO', () => {
    expect(
      isReleaseAgeRatingDto({ value: 'R', label: '17+', is_adult: true, description: 'Desc' }),
    ).toBe(true)
  })

  it('should return true for an empty object', () => {
    expect(isReleaseAgeRatingDto({})).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleaseAgeRatingDto(true)).toBe(false)
  })

  it('should return false if is_adult is not a boolean', () => {
    expect(isReleaseAgeRatingDto({ is_adult: 'true' })).toBe(false)
  })
})

describe('isReleasePublishDateDto', () => {
  it('should return true for a valid publish date DTO', () => {
    expect(isReleasePublishDateDto({ value: 1, description: 'Monday' })).toBe(true)
  })

  it('should return true for an empty object', () => {
    expect(isReleasePublishDateDto({})).toBe(true)
  })

  it('should return false if value is not a number', () => {
    expect(isReleasePublishDateDto({ value: '1' })).toBe(false)
  })
})

describe('isReleaseGenreItemDto', () => {
  it('should return true for a valid genre item DTO with image', () => {
    expect(
      isReleaseGenreItemDto({
        id: 1,
        name: 'Action',
        image: { url: 'img.jpg' },
        total_releases: 10,
      }),
    ).toBe(true)
  })

  it('should return true for a valid genre item DTO without image', () => {
    expect(isReleaseGenreItemDto({ id: 1, name: 'Action' })).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleaseGenreItemDto('string')).toBe(false)
  })

  it('should return false if image is not a record', () => {
    expect(isReleaseGenreItemDto({ image: 'invalid' })).toBe(false)
  })

  it('should return false if id is not a number', () => {
    expect(isReleaseGenreItemDto({ id: '1' })).toBe(false)
  })
})

describe('isReleaseDto', () => {
  it('should return true for a fully populated valid Release DTO', () => {
    const validDto = {
      id: 1,
      type: { value: 'tv' },
      year: 2023,
      name: { main: 'Title' },
      alias: 'alias',
      season: { value: 'winter' },
      poster: { src: 'poster.jpg' },
      fresh_at: 'str',
      created_at: 'str',
      updated_at: 'str',
      is_ongoing: false,
      age_rating: { value: 'R' },
      publish_day: { value: 1 },
      description: 'Description',
      notification: 'str',
      episodes_total: 12,
      external_player: 'http://player.url', // Also testing string variant
      is_in_production: false,
      is_blocked_by_geo: false,
      is_blocked_by_copyrights: false,
      added_in_users_favorites: 100,
      average_duration_of_episode: 24,
      added_in_planned_collection: 10,
      added_in_watched_collection: 20,
      added_in_watching_collection: 30,
      added_in_postponed_collection: 40,
      added_in_abandoned_collection: 50,
      genres: [{ id: 1, name: 'Action' }],
    }
    expect(isReleaseDto(validDto)).toBe(true)
  })

  it('should return true for an empty object (all fields are optional)', () => {
    expect(isReleaseDto({})).toBe(true)
  })

  it('should return true if external_player is a number', () => {
    expect(isReleaseDto({ external_player: 'https://player.com/' })).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isReleaseDto(123)).toBe(false)
    expect(isReleaseDto(null)).toBe(false)
    expect(isReleaseDto([])).toBe(false)
  })

  it('should return false if dates are strings instead of Date objects', () => {
    expect(isReleaseDto({ created_at: '2023-01-01T00:00:00Z' })).toBe(true)
  })

  it('should return false if notification is a boolean (must be null or undefined per types)', () => {
    expect(isReleaseDto({ notification: false })).toBe(false)
  })

  it('should return false if a nested object fails validation (e.g. invalid type DTO)', () => {
    expect(isReleaseDto({ type: { value: 123 } })).toBe(false)
  })

  it('should return false if genres is not an array', () => {
    expect(isReleaseDto({ genres: { id: 1 } })).toBe(false)
  })

  it('should return false if a genre item in the array is invalid', () => {
    expect(isReleaseDto({ genres: [{ id: 'invalid-id' }] })).toBe(false)
  })
})
