import { describe, expect, it } from 'vitest'
import { mapImageDto, mapImageOptimizedDto } from '../mapper'
// Import the types to ensure the test data is strictly typed
import type * as ImageTypes from '../types'

describe('mapImageDto', () => {
  it('should map all fields correctly when all are provided', () => {
    const dto: ImageTypes.ImageDto = {
      preview: 'preview-image-url',
      thumbnail: 'thumbnail-image-url',
      optimized: {
        preview: 'preview-image-url',
        thumbnail: 'thumbnail-image-url',
      },
    }

    // Use toStrictEqual for stricter object comparison
    expect(mapImageDto(dto)).toStrictEqual({
      preview: 'preview-image-url',
      thumbnail: 'thumbnail-image-url',
      optimized: {
        preview: 'preview-image-url',
        thumbnail: 'thumbnail-image-url',
      },
    })
  })

  it('should convert undefined fields to null', () => {
    const dto: ImageTypes.ImageDto = {}

    expect(mapImageDto(dto)).toStrictEqual({
      preview: null,
      thumbnail: null,
      optimized: null,
    })
  })

  it('should handle partial fields (preview and thumbnail provided, optimized missing)', () => {
    const dto: ImageTypes.ImageDto = {
      preview: 'preview-image-url',
      thumbnail: 'thumbnail-image-url',
    }

    expect(mapImageDto(dto)).toStrictEqual({
      preview: 'preview-image-url',
      thumbnail: 'thumbnail-image-url',
      optimized: null,
    })
  })

  // Removed the duplicate "partially missing" test and kept one clear case for partial optimized fields
  it('should map optimized fields correctly when only some are present', () => {
    const dto: ImageTypes.ImageDto = {
      optimized: {
        preview: 'preview-image-url',
      },
    }
    expect(mapImageDto(dto)).toStrictEqual({
      preview: null,
      thumbnail: null,
      optimized: {
        preview: 'preview-image-url',
        thumbnail: null,
      },
    })
  })

  it('should map optimized fields correctly when thumbnail is present but preview is missing', () => {
    const dto: ImageTypes.ImageDto = {
      optimized: {
        thumbnail: 'thumbnail-image-url',
      },
    }
    expect(mapImageDto(dto)).toStrictEqual({
      preview: null,
      thumbnail: null,
      optimized: {
        preview: null,
        thumbnail: 'thumbnail-image-url',
      },
    })
  })
})

describe('mapImageOptimizedDto', () => {
  it('should map all fields correctly when both are provided', () => {
    const dto: ImageTypes.ImageOptimizedDto = {
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
    }

    expect(mapImageOptimizedDto(dto)).toStrictEqual({
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
    })
  })

  it('should map missing fields to null', () => {
    const dto: ImageTypes.ImageOptimizedDto = {}

    expect(mapImageOptimizedDto(dto)).toStrictEqual({
      preview: null,
      thumbnail: null,
    })
  })

  it('should map present fields and missing fields to null', () => {
    const dto: ImageTypes.ImageOptimizedDto = {
      thumbnail: 'thumbnail-url',
    }

    expect(mapImageOptimizedDto(dto)).toStrictEqual({
      preview: null,
      thumbnail: 'thumbnail-url',
    })
  })
})
