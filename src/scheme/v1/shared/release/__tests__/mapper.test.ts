import { describe, it, expect, vi, afterEach } from 'vitest'
import type * as ReleaseTypes from '../types'
import { ImageMappers } from '../../image'
import {
  mapReleaseDto,
  mapReleaseTypeDto,
  mapReleaseNameDto,
  mapReleaseSeasonDto,
  mapReleasePosterDto,
  mapReleasePosterOptimizedDto,
  mapReleaseAgeRatingDto,
  mapReleasePublishDateDto,
  mapReleaseGenreItemDto,
} from '../mapper'

// Mock the external Image mapping dependency
vi.mock('../../image', () => ({
  ImageMappers: {
    mapImageDto: vi.fn(),
  },
}))

describe('Release Mappers', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  // Covers mapping of the simple Type DTO and its nullish branches
  describe('mapReleaseTypeDto', () => {
    it('should map all fields correctly when provided', () => {
      const dto: ReleaseTypes.ReleaseTypeDto = { value: 'tv', description: 'TV Series' }
      expect(mapReleaseTypeDto(dto)).toStrictEqual({ value: 'tv', description: 'TV Series' })
    })

    it('should handle missing or undefined fields by returning null', () => {
      const dto: ReleaseTypes.ReleaseTypeDto = {}
      expect(mapReleaseTypeDto(dto)).toStrictEqual({ value: null, description: null })
    })
  })

  // Covers mapping of the Name DTO and its nullish branches
  describe('mapReleaseNameDto', () => {
    it('should map all fields correctly when provided', () => {
      const dto: ReleaseTypes.ReleaseNameDto = {
        main: 'Naruto',
        english: 'Naruto',
        alternative: 'ナルト',
      }
      expect(mapReleaseNameDto(dto)).toStrictEqual({
        main: 'Naruto',
        english: 'Naruto',
        alternative: 'ナルト',
      })
    })

    it('should handle missing fields by returning null', () => {
      const dto: ReleaseTypes.ReleaseNameDto = {}
      expect(mapReleaseNameDto(dto)).toStrictEqual({
        main: null,
        english: null,
        alternative: null,
      })
    })
  })

  // Covers mapping of the Season DTO and its nullish branches
  describe('mapReleaseSeasonDto', () => {
    it('should map all fields correctly when provided', () => {
      const dto: ReleaseTypes.ReleaseSeasonDto = { value: 'winter', description: 'Winter Season' }
      expect(mapReleaseSeasonDto(dto)).toStrictEqual({
        value: 'winter',
        description: 'Winter Season',
      })
    })

    it('should handle missing fields by returning null', () => {
      const dto: ReleaseTypes.ReleaseSeasonDto = {}
      expect(mapReleaseSeasonDto(dto)).toStrictEqual({ value: null, description: null })
    })
  })

  // Covers mapping of the Optimized Poster DTO and its nullish branches
  describe('mapReleasePosterOptimizedDto', () => {
    it('should map all fields correctly when provided', () => {
      const dto: ReleaseTypes.ReleasePosterOptimizedDto = {
        src: 'src.jpg',
        preview: 'prev.jpg',
        thumbnail: 'thumb.jpg',
      }
      expect(mapReleasePosterOptimizedDto(dto)).toStrictEqual({
        src: 'src.jpg',
        preview: 'prev.jpg',
        thumbnail: 'thumb.jpg',
      })
    })

    it('should handle missing fields by returning null', () => {
      const dto: ReleaseTypes.ReleasePosterOptimizedDto = {}
      expect(mapReleasePosterOptimizedDto(dto)).toStrictEqual({
        src: null,
        preview: null,
        thumbnail: null,
      })
    })
  })

  // Covers mapping of the Poster DTO, nested Optimized mapping, and nullish branches
  describe('mapReleasePosterDto', () => {
    it('should map all fields and nested optimized object correctly', () => {
      const dto: ReleaseTypes.ReleasePosterDto = {
        src: 'src.jpg',
        preview: 'prev.jpg',
        thumbnail: 'thumb.jpg',
        optimized: { src: 'opt.jpg' },
      }
      expect(mapReleasePosterDto(dto)).toStrictEqual({
        src: 'src.jpg',
        preview: 'prev.jpg',
        thumbnail: 'thumb.jpg',
        optimized: { src: 'opt.jpg', preview: null, thumbnail: null },
      })
    })

    it('should return null for nested optimized object if missing', () => {
      const dto: ReleaseTypes.ReleasePosterDto = { src: 'src.jpg' }
      expect(mapReleasePosterDto(dto)).toStrictEqual({
        src: 'src.jpg',
        preview: null,
        thumbnail: null,
        optimized: null,
      })
    })

    it('should handle empty object by returning nulls', () => {
      const dto: ReleaseTypes.ReleasePosterDto = {}
      expect(mapReleasePosterDto(dto)).toStrictEqual({
        src: null,
        preview: null,
        thumbnail: null,
        optimized: null,
      })
    })
  })

  // Covers mapping of the Age Rating DTO and its nullish branches
  describe('mapReleaseAgeRatingDto', () => {
    it('should map all fields correctly when provided', () => {
      const dto: ReleaseTypes.ReleaseAgeRatingDto = {
        value: 'R-17+',
        label: '17+',
        is_adult: true,
        description: 'Violence',
      }
      expect(mapReleaseAgeRatingDto(dto)).toStrictEqual({
        value: 'R-17+',
        label: '17+',
        isAdult: true,
        description: 'Violence',
      })
    })

    it('should handle empty object by returning nulls', () => {
      const dto: ReleaseTypes.ReleaseAgeRatingDto = {}
      expect(mapReleaseAgeRatingDto(dto)).toStrictEqual({
        value: null,
        label: null,
        isAdult: null,
        description: null,
      })
    })
  })

  // Covers mapping of the Publish Date DTO and its nullish branches
  describe('mapReleasePublishDateDto', () => {
    it('should map all fields correctly when provided', () => {
      const dto: ReleaseTypes.ReleasePublishDateDto = { value: 1, description: 'Monday' }
      expect(mapReleasePublishDateDto(dto)).toStrictEqual({ value: 1, description: 'Monday' })
    })

    it('should handle empty object by returning nulls', () => {
      const dto: ReleaseTypes.ReleasePublishDateDto = {}
      expect(mapReleasePublishDateDto(dto)).toStrictEqual({ value: null, description: null })
    })
  })

  // Covers mapping of the Genre Item DTO, external Image dependency mocking, and nullish branches
  describe('mapReleaseGenreItemDto', () => {
    it('should map fields correctly and call external image mapper when image is present', () => {
      const mockImageDto = {
        preview: 'preview-image-url',
        thumbnail: 'thumbnail-image-url',
        optimized: {
          preview: 'preview-image-url',
          thumbnail: 'thumbnail-image-url',
        },
      }
      const mockMappedImage = {
        preview: 'preview-image-url',
        thumbnail: 'thumbnail-image-url',
        optimized: {
          preview: 'preview-image-url',
          thumbnail: 'thumbnail-image-url',
        },
      }
      vi.mocked(ImageMappers.mapImageDto).mockReturnValueOnce(mockMappedImage)

      const dto: ReleaseTypes.ReleaseGenreItemDto = {
        id: 10,
        name: 'Action',
        total_releases: 100,
        image: mockImageDto,
      }

      expect(mapReleaseGenreItemDto(dto)).toStrictEqual({
        id: 10,
        name: 'Action',
        totalReleases: 100,
        image: mockMappedImage,
      })
      expect(ImageMappers.mapImageDto).toHaveBeenCalledWith(mockImageDto)
      expect(ImageMappers.mapImageDto).toHaveBeenCalledTimes(1)
    })

    it('should return null for image when it is missing, without calling the image mapper', () => {
      const dto: ReleaseTypes.ReleaseGenreItemDto = { id: 10, name: 'Action' }
      expect(mapReleaseGenreItemDto(dto)).toStrictEqual({
        id: 10,
        name: 'Action',
        totalReleases: null,
        image: null,
      })
      expect(ImageMappers.mapImageDto).not.toHaveBeenCalled()
    })
  })

  // Covers mapping of the root Release DTO, checking nested mappers, boolean strict type checks, and array mappings
  describe('mapReleaseDto', () => {
    it('should map a fully populated Release DTO correctly', () => {
      const mockDate = new Date('2023-01-01T00:00:00Z')
      const dto: ReleaseTypes.ReleaseDto = {
        id: 1,
        type: { value: 'tv' },
        year: 2023,
        name: { main: 'Title' },
        alias: 'title-alias',
        season: { value: 'winter' },
        poster: { src: 'poster.jpg' },
        fresh_at: mockDate,
        created_at: mockDate,
        updated_at: mockDate,
        is_ongoing: true,
        age_rating: { value: 'R' },
        publish_day: { value: 1 },
        description: 'Desc',
        notification: false,
        episodes_total: 12,
        external_player: 'player-url',
        is_in_production: true,
        is_blocked_by_geo: false,
        is_blocked_by_copyrights: true,
        added_in_users_favorites: 100,
        average_duration_of_episode: 24,
        added_in_planned_collection: 10,
        added_in_watched_collection: 20,
        added_in_watching_collection: 30,
        added_in_postponed_collection: 40,
        added_in_abandoned_collection: 50,
        genres: [{ id: 1, name: 'Action' }],
      }

      const result = mapReleaseDto(dto)

      expect(result.id).toBe(1)
      expect(result.year).toBe(2023)
      expect(result.alias).toBe('title-alias')
      expect(result.freshAt).toStrictEqual(mockDate)
      expect(result.createdAt).toStrictEqual(mockDate)
      expect(result.updatedAt).toStrictEqual(mockDate)
      expect(result.isOngoing).toBe(true)
      expect(result.description).toBe('Desc')
      expect(result.notification).toBe(false)
      expect(result.episodesTotal).toBe(12)
      expect(result.externalPlayer).toBe('player-url')
      expect(result.isInProduction).toBe(true)
      expect(result.isBlockedByGeo).toBe(false)
      expect(result.isBlockedByCopyrights).toBe(true)
      expect(result.addedInUsersFavorites).toBe(100)
      expect(result.averageDurationOfEpisode).toBe(24)
      expect(result.addedInPlannedCollection).toBe(10)
      expect(result.addedInWatchedCollection).toBe(20)
      expect(result.addedInWatchingCollection).toBe(30)
      expect(result.addedInPostponedCollection).toBe(40)
      expect(result.addedInAbandonedCollection).toBe(50)

      // Checking nested maps
      expect(result.type).toStrictEqual({ value: 'tv', description: null })
      expect(result.name).toStrictEqual({ main: 'Title', english: null, alternative: null })
      expect(result.season).toStrictEqual({ value: 'winter', description: null })
      expect(result.poster).toStrictEqual({
        src: 'poster.jpg',
        preview: null,
        thumbnail: null,
        optimized: null,
      })
      expect(result.ageRating).toStrictEqual({
        value: 'R',
        label: null,
        isAdult: null,
        description: null,
      })
      expect(result.publishDay).toStrictEqual({ value: 1, description: null })
      expect(result.genres).toStrictEqual([
        { id: 1, name: 'Action', image: null, totalReleases: null },
      ])
    })

    it('should handle completely empty DTO, setting all fields to null (and bypassing nested maps)', () => {
      const dto: ReleaseTypes.ReleaseDto = {}
      const result = mapReleaseDto(dto)

      // All top level properties should default to null
      Object.values(result).forEach((value) => {
        expect(value).toBeNull()
      })
    })

    it('should map strict boolean fields to null if they receive non-boolean inputs (Invalid/Malformed inputs)', () => {
      const dto = {
        notification: 'true', // Malformed: should be boolean or null
        is_in_production: 1, // Malformed: should be boolean
      } as unknown as ReleaseTypes.ReleaseDto

      const result = mapReleaseDto(dto)

      // The mapper uses typeof x === 'boolean', so these should strictly fallback to null
      expect(result.notification).toBeNull()
      expect(result.isInProduction).toBeNull()
    })

    it('should handle empty genres array', () => {
      const dto: ReleaseTypes.ReleaseDto = { genres: [] }
      const result = mapReleaseDto(dto)
      expect(result.genres).toStrictEqual([])
    })

    it('should map idempotently when called multiple times with the same input', () => {
      const dto: ReleaseTypes.ReleaseDto = { year: 2024, type: { value: 'movie' } }
      const firstCall = mapReleaseDto(dto)
      const secondCall = mapReleaseDto(dto)
      expect(firstCall).toStrictEqual(secondCall)
    })
  })
})
