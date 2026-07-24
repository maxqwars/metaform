/**
 * This test file covers the type guards for Image objects in src/scheme/v1/shared/image/guards.ts.
 * It ensures that both `isImageDto` and `isImageOptimizedDto` correctly validate
 * standard image structures including optional preview, thumbnail, and optimized fields.
 */

import { describe, it, expect } from 'vitest'
import { isImageDto, isImageOptimizedDto } from '../guards'

describe('isImageOptimizedDto', () => {
  // Test standard valid inputs for the optimized image guard
  it('should return true for a valid optimized image DTO with both preview and thumbnail', () => {
    const validDto = {
      preview: 'https://example.com/preview',
      thumbnail: 'https://example.com/thumb',
    }
    expect(isImageOptimizedDto(validDto)).toBe(true)
  })

  // Test that missing optional fields still pass the guard
  it('should return true for a valid optimized image DTO with one or both fields undefined', () => {
    const partialDto = { preview: 'https://example.com/preview' }
    expect(isImageOptimizedDto(partialDto)).toBe(true)

    const emptyDto = {}
    expect(isImageOptimizedDto(emptyDto)).toBe(true)
  })

  // Test input that is not an object (not a record)
  it('should return false for inputs that are not records', () => {
    expect(isImageOptimizedDto('string')).toBe(false)
    expect(isImageOptimizedDto(123)).toBe(false)
    expect(isImageOptimizedDto(null)).toBe(false)
    expect(isImageOptimizedDto(undefined)).toBe(false)
  })

  // Test incorrect types for the fields (e.g., numbers instead of strings)
  it('should return false if preview or thumbnail are not valid types', () => {
    const invalidDto1 = { preview: 123, thumbnail: 'valid' }
    expect(isImageOptimizedDto(invalidDto1)).toBe(false)

    const invalidDto2 = { preview: 'valid', thumbnail: true }
    expect(isImageOptimizedDto(invalidDto2)).toBe(false)
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
    expect(isImageDto(validDto)).toBe(true)
  })

  // Test valid scenarios where optional fields are missing or optimized is absent
  it('should return true for a valid image DTO with some missing optional fields', () => {
    const partialDto = { preview: 'path1' } // thumbnail and optimized missing
    expect(isImageDto(partialDto)).toBe(true)

    const noOptimizedDto = {
      preview: 'path1',
      thumbnail: 'path2',
    }
    expect(isImageDto(noOptimizedDto)).toBe(true)
  })

  // Test input that is not an object (not a record)
  it('should return false for inputs that are not records', () => {
    expect(isImageDto('string')).toBe(false)
    expect(isImageDto(123)).toBe(false)
    expect(isImageDto(null)).toBe(false)
  })

  // Test failure cases where fields exist but have incorrect types
  it('should return false if preview or thumbnail are not strings', () => {
    const invalidPreview = { preview: 123, thumbnail: 'valid' }
    expect(isImageDto(invalidPreview)).toBe(false)

    const invalidThumbnail = { preview: 'valid', thumbnail: true }
    expect(isImageDto(invalidThumbnail)).toBe(false)
  })

  // Test failure when the "optimized" field exists but is not a valid optimized DTO
  it('should return false if the optimized property is present but invalid', () => {
    const invalidOptimized = {
      preview: 'p1',
      thumbnail: 't1',
      optimized: 'not-a-record',
    }
    expect(isImageDto(invalidOptimized)).toBe(false)

    const malformedOptimized = {
      preview: 'p1',
      thumbnail: 't1',
      optimized: { preview: 123 }, // nested field is wrong type
    }
    expect(isImageDto(malformedOptimized)).toBe(false)
  })

  // Test edge cases for empty strings and mixed types
  it('should return true for valid DTOs containing empty strings', () => {
    const emptyStrings = { preview: '', thumbnail: '' }
    expect(isImageDto(emptyStrings)).toBe(true)
  })
})
