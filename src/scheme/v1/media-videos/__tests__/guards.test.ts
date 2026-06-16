import { describe, it, expect } from 'vitest'
import {
  isMediaVideosDto,
  isMediaVideosItemDto,
  isMediaVideosItemImageDto,
  isMediaVideosItemImageOptimizedDto,
  isMediaVideoItemOriginTypeDto,
  isMediaVideosItemOriginDto,
} from '../guards'

const VALID_UUID = '814dbb68-b1fc-494a-af42-1f01e69e78d1'

describe('isMediaVideosItemImageOptimizedDto', () => {
  it('should return true for valid optimized image DTO with defined preview and thumbnail', () => {
    const validDto = { preview: 'test', thumbnail: 'test' }
    expect(isMediaVideosItemImageOptimizedDto(validDto)).toBe(true)
  })

  it('should return true for valid optimized image DTO with undefined preview and thumbnail', () => {
    const validDto = { preview: undefined, thumbnail: undefined }
    expect(isMediaVideosItemImageOptimizedDto(validDto)).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isMediaVideosItemImageOptimizedDto('string')).toBe(false)
    expect(isMediaVideosItemImageOptimizedDto(123)).toBe(false)
    expect(isMediaVideosItemImageOptimizedDto(null)).toBe(false)
  })

  it('should return true for valid optimized image DTO with empty strings', () => {
    const validDto = { preview: '', thumbnail: '' }
    expect(isMediaVideosItemImageOptimizedDto(validDto)).toBe(true)
  })

  it('should return false if preview is not a string or undefined', () => {
    const invalidDto = { preview: 123, thumbnail: 'test' }
    expect(isMediaVideosItemImageOptimizedDto(invalidDto)).toBe(false)
  })

  it('should return false if thumbnail is not a string or undefined', () => {
    const invalidDto = { preview: 'test', thumbnail: 123 }
    expect(isMediaVideosItemImageOptimizedDto(invalidDto)).toBe(false)
  })

  it('should handle boolean values correctly', () => {
    const invalidDto = { preview: true, thumbnail: false }
    expect(isMediaVideosItemImageOptimizedDto(invalidDto)).toBe(false)
  })

  it('should return true if the object has extra properties', () => {
    const invalidDto = { preview: 'test', thumbnail: 'test', extraProperty: 123 }
    expect(isMediaVideosItemImageOptimizedDto(invalidDto)).toBe(true)
  })
})

describe('isMediaVideosItemImageDto', () => {
  it('should return true for valid image DTO', () => {
    const validDto = { preview: 'test', thumbnail: 'test' }
    expect(isMediaVideosItemImageDto(validDto)).toBe(true)
  })

  it('should return false for invalid image DTO (not a record)', () => {
    expect(isMediaVideosItemImageDto('string')).toBe(false)
    expect(isMediaVideosItemImageDto(123)).toBe(false)
    expect(isMediaVideosItemImageDto(null)).toBe(false)
  })

  it('should return false if optimized is not a record', () => {
    const invalidDto = { preview: 'test', thumbnail: 'test', optimized: 'string' }
    expect(isMediaVideosItemImageDto(invalidDto)).toBe(false)
  })

  it('should return true for valid image DTO with undefined values', () => {
    const validDto = { preview: undefined, thumbnail: undefined }
    expect(isMediaVideosItemImageDto(validDto)).toBe(true)
  })
})

describe('isMediaVideoItemOriginTypeDto', () => {
  it('should return true for valid origin type DTO', () => {
    const validDto = { value: 'test', description: 'test' }
    expect(isMediaVideoItemOriginTypeDto(validDto)).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isMediaVideoItemOriginTypeDto('string')).toBe(false)
  })

  it('should return false if value or description is not a string', () => {
    expect(isMediaVideoItemOriginTypeDto({ value: 123 })).toBe(false)
    expect(isMediaVideoItemOriginTypeDto({ description: true })).toBe(false)
  })
})

describe('isMediaVideosItemOriginDto', () => {
  it('should return true for valid origin DTO', () => {
    const validDto = {
      id: VALID_UUID,
      url: 'http://test.com',
      type: { value: 'type', description: 'desc' },
      title: 'Title',
      description: 'Description',
      is_announce: true,
    }
    expect(isMediaVideosItemOriginDto(validDto)).toBe(true)
  })

  it('should return false if id is not a valid UUID', () => {
    const invalidDto = { id: 'invalid-uuid', title: 'test' }
    expect(isMediaVideosItemOriginDto(invalidDto)).toBe(false)
  })

  it('should return false if type is not a valid OriginTypeDto', () => {
    const invalidDto = { id: VALID_UUID, type: 'string' }
    expect(isMediaVideosItemOriginDto(invalidDto)).toBe(false)
  })

  it('should handle undefined values correctly', () => {
    const validDto = {
      id: undefined,
      url: undefined,
      type: undefined,
      title: undefined,
      description: undefined,
      is_announce: undefined,
    }
    expect(isMediaVideosItemOriginDto(validDto)).toBe(true)
  })
})

describe('isMediaVideosItemDto', () => {
  it('should return true for a valid media video item DTO', () => {
    const validDto = {
      id: 123,
      url: 'https://video.com',
      title: 'Video Title',
      views: 1000,
      image: { preview: 'p', thumbnail: 't', optimized: { preview: 'p', thumbnail: 't' } },
      comments: 50,
      video_id: 'youtube-id',
      created_at: '2023-01-01',
      updated_at: '2023-01-02',
      is_announce: true,
      origin: { id: VALID_UUID, url: '...', type: { value: 'v' } },
    }
    expect(isMediaVideosItemDto(validDto)).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isMediaVideosItemDto('string')).toBe(false)
    expect(isMediaVideosItemDto(null)).toBe(false)
  })

  it('should return false if id is not an optional valid number', () => {
    const invalidDto = { id: 'not-a-number', title: 'Test' }
    expect(isMediaVideosItemDto(invalidDto)).toBe(false)
  })

  it('should return false if image is not a valid image DTO', () => {
    const invalidDto = { image: 'string' }
    expect(isMediaVideosItemDto(invalidDto)).toBe(false)
  })

  it('should return false if origin is not a valid origin DTO', () => {
    const invalidDto = { origin: 'string' }
    expect(isMediaVideosItemDto(invalidDto)).toBe(false)
  })

  it('should handle undefined or null values correctly', () => {
    const validDto = {
      id: undefined,
      url: undefined,
      title: undefined,
      views: undefined,
      image: null,
      comments: undefined,
      video_id: undefined,
      created_at: undefined,
      updated_at: undefined,
      is_announce: undefined,
      origin: undefined,
    }
    expect(isMediaVideosItemDto(validDto)).toBe(true)
  })
})

describe('isMediaVideosDto', () => {
  it('should return true for a valid media videos DTO (array of items)', () => {
    const validDto = [
      {
        id: 1,
        url: 'url',
        title: 'Title',
        views: 10,
        image: { preview: 'p' },
        comments: 0,
        video_id: 'vid',
        created_at: 'now',
        updated_at: 'now',
        is_announce: false,
        origin: { id: VALID_UUID },
      },
    ]
    expect(isMediaVideosDto(validDto)).toBe(true)
  })

  it('should return false if not an array', () => {
    expect(isMediaVideosDto('string')).toBe(false)
    expect(isMediaVideosDto(null)).toBe(false)
  })

  it('should return false if any item in the array is not a valid item DTO', () => {
    const invalidDto = [
      { id: 1, title: 'Valid' },
      { id: 'not-a-number' }, // Invalid item
    ]
    expect(isMediaVideosDto(invalidDto)).toBe(false)
  })

  it('should return true for an empty array', () => {
    expect(isMediaVideosDto([])).toBe(true)
  })
})
