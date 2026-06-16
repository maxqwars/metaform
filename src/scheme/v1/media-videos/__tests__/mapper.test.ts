import { describe, expect, it } from 'vitest'
import {
  mapMediaVideosDto,
  mapMediaVideosImageDto,
  mapMediaVideosImageOptimizedDto,
  mapMediaVideosItemOriginDto,
  mapMediaVideoItemOriginTypeDto,
} from '../mapper'

describe('mapMediaVideoItemOriginTypeDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const dto = {
      value: 'some-value',
      description: 'some-description',
    }
    expect(mapMediaVideoItemOriginTypeDto(dto)).toEqual({
      value: 'some-value',
      description: 'some-description',
    })
  })

  it('Converts undefined fields to null', () => {
    const dto = {}
    expect(mapMediaVideoItemOriginTypeDto(dto)).toEqual({
      value: null,
      description: null,
    })
  })
})

describe('mapMediaVideosItemOriginDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const dto = {
      id: 'origin-1',
      url: 'url-1',
      title: 'title-1',
      description: 'desc-1',
      is_announce: true,
      type: {
        value: 'type-1',
        description: 'desc-type-1',
      },
    }
    expect(mapMediaVideosItemOriginDto(dto)).toEqual({
      id: 'origin-1',
      url: 'url-1',
      title: 'title-1',
      description: 'desc-1',
      isAnnounce: true,
      type: {
        value: 'type-1',
        description: 'desc-type-1',
      },
    })
  })

  it('Converts undefined fields to null', () => {
    const dto = {}
    expect(mapMediaVideosItemOriginDto(dto)).toEqual({
      id: null,
      url: null,
      title: null,
      description: null,
      isAnnounce: null,
      type: null,
    })
  })

  it('Handles missing type object', () => {
    const dto = {
      id: 'origin-2',
      is_announce: false,
    }
    expect(mapMediaVideosItemOriginDto(dto)).toEqual({
      id: 'origin-2',
      url: null,
      title: null,
      description: null,
      isAnnounce: false,
      type: null,
    })
  })
})

describe('mapMediaVideosImageOptimizedDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const dto = {
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
    }
    expect(mapMediaVideosImageOptimizedDto(dto)).toEqual({
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
    })
  })

  it('Converts undefined fields to null', () => {
    const dto = {}
    expect(mapMediaVideosImageOptimizedDto(dto)).toEqual({
      preview: null,
      thumbnail: null,
    })
  })
})

describe('mapMediaVideosImageDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const dto = {
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
      optimized: {
        preview: 'opt-preview',
        thumbnail: 'opt-thumbnail',
      },
    }
    expect(mapMediaVideosImageDto(dto)).toEqual({
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
      optimized: {
        preview: 'opt-preview',
        thumbnail: 'opt-thumbnail',
      },
    })
  })

  it('Converts undefined fields to null', () => {
    const dto = {}
    expect(mapMediaVideosImageDto(dto)).toEqual({
      preview: null,
      thumbnail: null,
      optimized: null,
    })
  })

  it('Handles missing optimized object', () => {
    const dto = {
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
    }
    expect(mapMediaVideosImageDto(dto)).toEqual({
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
      optimized: null,
    })
  })
})

describe('mapMediaVideosDto', () => {
  it('Maps all fields correctly including nested objects', () => {
    const dto = [
      {
        id: 1,
        url: 'http://video.com',
        title: 'Test Video',
        views: 100,
        image: {
          preview: 'preview-img',
          thumbnail: 'thumb-img',
          optimized: {
            preview: 'opt-preview',
            thumbnail: 'opt-thumb',
          },
        },
        comments: 10,
        video_id: 'vid-123',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        is_announce: true,
        origin: {
          id: 'orig-1',
          url: 'orig-url',
          title: 'Orig Title',
          description: 'Orig Desc',
          is_announce: false,
          type: {
            value: 'type-val',
            description: 'type-desc',
          },
        },
      },
    ]

    const result = mapMediaVideosDto(dto)

    expect(result[0]).toEqual({
      id: 1,
      url: 'http://video.com',
      title: 'Test Video',
      views: 100,
      comments: 10,
      videoId: 'vid-123',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      isAnnounce: true,
      image: {
        preview: 'preview-img',
        thumbnail: 'thumb-img',
        optimized: {
          preview: 'opt-preview',
          thumbnail: 'opt-thumb',
        },
      },
      origin: {
        id: 'orig-1',
        url: 'orig-url',
        title: 'Orig Title',
        description: 'Orig Desc',
        isAnnounce: false,
        type: {
          value: 'type-val',
          description: 'type-desc',
        },
      },
    })
  })

  it('Converts undefined fields to null and handles missing nested objects', () => {
    const dto = [
      {
        // All fields undefined
      },
    ]

    expect(mapMediaVideosDto(dto)).toEqual([
      {
        id: null,
        url: null,
        title: null,
        views: null,
        comments: null,
        videoId: null,
        createdAt: null,
        updatedAt: null,
        isAnnounce: null,
        image: null,
        origin: null,
      },
    ])
  })

  it('Maps empty array to empty array', () => {
    expect(mapMediaVideosDto([])).toEqual([])
  })

  it('Renames snake_case keys correctly', () => {
    const dto = [
      {
        video_id: 'vid-1',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        is_announce: true,
      },
    ]

    const result = mapMediaVideosDto(dto)[0]

    expect(result.videoId).toBe('vid-1')
    expect(result.createdAt).toBe('2023-01-01')
    expect(result.updatedAt).toBe('2023-01-02')
    expect(result.isAnnounce).toBe(true)
    expect(result).not.toHaveProperty('video_id')
    expect(result).not.toHaveProperty('created_at')
    expect(result).not.toHaveProperty('updated_at')
  })
})
