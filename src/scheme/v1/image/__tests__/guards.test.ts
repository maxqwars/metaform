/**
 * This test file covers the type guards for Image objects in src/scheme/v1/shared/image/guards.ts.
 * It ensures that both `isImageDto` and `isImageOptimizedDto` correctly validate
 * standard image structures including optional preview, thumbnail, and optimized fields.
 */

/*
 * TODO: Refactoring needed
 */

import { describe, it, expect } from 'vitest'
import { isImageResponse, isImageWithOptimizedResponse } from '../guards'

describe('isImageOptimizedDto', () => {
  // Test standard valid inputs for the optimized image guard
  it('should return true for a valid optimized image DTO with both preview and thumbnail', () => {
    const validDto = {
      preview: 'https://example.com/preview',
      thumbnail: 'https://example.com/thumb',
    }
    expect(isImageWithOptimizedResponse(validDto)).toBe(true)
  })

  // Test that missing optional fields still pass the guard
  it('should return true for a valid optimized image DTO with one or both fields undefined', () => {
    const partialDto = { preview: 'https://example.com/preview' }
    expect(isImageWithOptimizedResponse(partialDto)).toBe(true)

    const emptyDto = {}
    expect(isImageWithOptimizedResponse(emptyDto)).toBe(true)
  })

  // Test input that is not an object (not a record)
  it('should return false for inputs that are not records', () => {
    expect(isImageWithOptimizedResponse('string')).toBe(false)
    expect(isImageWithOptimizedResponse(123)).toBe(false)
    expect(isImageWithOptimizedResponse(null)).toBe(false)
    expect(isImageWithOptimizedResponse(undefined)).toBe(false)
  })

  // Test incorrect types for the fields (e.g., numbers instead of strings)
  it('should return false if preview or thumbnail are not valid types', () => {
    const invalidDto1 = { preview: 123, thumbnail: 'valid' }
    expect(isImageWithOptimizedResponse(invalidDto1)).toBe(false)

    const invalidDto2 = { preview: 'valid', thumbnail: true }
    expect(isImageWithOptimizedResponse(invalidDto2)).toBe(false)
  })
})

describe('isImageDto', () => {
  // Test standard valid inputs for the main image guard
  it('should return true for a valid image DTO with all fields populated', () => {
    const validDto = {
      preview: 'path1',
      thumbnail: 'path2',
      optimized: { preview: 'p3', thumbnail: 't3' },
    }
    expect(isImageResponse(validDto)).toBe(true)
  })

  // Test valid scenarios where optional fields are missing or optimized is absent
  it('should return true for a valid image DTO with some missing optional fields', () => {
    const partialDto = { preview: 'path1' } // thumbnail and optimized missing
    expect(isImageResponse(partialDto)).toBe(true)

    const noOptimizedDto = {
      preview: 'path1',
      thumbnail: 'path2',
    }
    expect(isImageResponse(noOptimizedDto)).toBe(true)
  })

  // Test input that is not an object (not a record)
  it('should return false for inputs that are not records', () => {
    expect(isImageResponse('string')).toBe(false)
    expect(isImageResponse(123)).toBe(false)
    expect(isImageResponse(null)).toBe(false)
  })

  // Test failure cases where fields exist but have incorrect types
  it('should return false if preview or thumbnail are not strings', () => {
    const invalidPreview = { preview: 123, thumbnail: 'valid' }
    expect(isImageResponse(invalidPreview)).toBe(false)

    const invalidThumbnail = { preview: 'valid', thumbnail: true }
    expect(isImageResponse(invalidThumbnail)).toBe(false)
  })

  // Test failure when the "optimized" field exists but is not a valid optimized DTO
  it('should return false if the optimized property is present but invalid', () => {
    const invalidOptimized = {
      preview: 'p1',
      thumbnail: 't1',
      optimized: 'not-a-record',
    }
    expect(isImageResponse(invalidOptimized)).toBe(false)

    const malformedOptimized = {
      preview: 'p1',
      thumbnail: 't1',
      optimized: { preview: 123 }, // nested field is wrong type
    }
    expect(isImageResponse(malformedOptimized)).toBe(false)
  })

  // Test edge cases for empty strings and mixed types
  it('should return true for valid DTOs containing empty strings', () => {
    const emptyStrings = { preview: '', thumbnail: '' }
    expect(isImageResponse(emptyStrings)).toBe(true)
  })
})
