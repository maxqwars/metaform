import { describe, it, expect } from 'vitest'
import { isMediaPromotionsItemDto, isMediaPromotionsDto } from '../guards'
import type { MediaPromotionsItemDto } from '../types'

// Minimum valid objects for testing guards
const validImage = {
  preview: 'https://example.com/preview.jpg',
  thumbnail: 'https://example.com/thumb.jpg',
}

const validRelease = {
  id: 1,
}

// Invalid objects for testing guards
const invalidImage = {
  preview: 12345,
}

const invalidRelease = {
  id: 'e367e236e', // incorrect id type
}

describe('Media Promotions Guards', () => {
  describe('isMediaPromotionsItemDto', () => {
    it('should return false for non-record values', () => {
      // Using `as unknown` to safely bypass ESLint strictness
      expect(isMediaPromotionsItemDto(null)).toBe(false)
      expect(isMediaPromotionsItemDto(undefined)).toBe(false)
      expect(isMediaPromotionsItemDto('string')).toBe(false)
      expect(isMediaPromotionsItemDto(123)).toBe(false)
    })

    it('should return true for a valid item with all fields', () => {
      const validItem: MediaPromotionsItemDto = {
        id: '123',
        url: 'https://example.com/promo',
        image: validImage,
        title: 'Promo Title',
        is_ad: true,
        ad_erid: 'erid123',
        ad_origin: 'source1',
        url_label: 'Label',
        has_overlay: false,
        release: validRelease,
      }

      expect(isMediaPromotionsItemDto(validItem)).toBe(true)
    })

    it('should return true for an item with optional fields omitted or undefined', () => {
      const minimalItem: MediaPromotionsItemDto = {
        id: '123',
        url: 'https://example.com/promo',
        image: undefined,
        title: undefined,
        is_ad: false,
        ad_erid: undefined,
        ad_origin: undefined,
        url_label: undefined,
        has_overlay: true,
        release: undefined,
      }

      expect(isMediaPromotionsItemDto(minimalItem)).toBe(true)
    })

    it('should return false if image is present but fails ImageTypeGuards', () => {
      const item = {
        id: '123',
        url: 'https://example.com/promo',
        image: invalidImage,
        title: 'Promo Title',
        is_ad: true,
        ad_erid: 'erid123',
        ad_origin: 'source1',
        url_label: 'Label',
        has_overlay: false,
        release: undefined,
      }

      expect(isMediaPromotionsItemDto(item as unknown as MediaPromotionsItemDto)).toBe(false)
    })

    it('should return false if release is present but fails ReleaseTypeGuards', () => {
      const item = {
        id: '123',
        url: 'https://example.com/promo',
        image: undefined,
        title: 'Promo Title',
        is_ad: true,
        ad_erid: 'erid123',
        ad_origin: 'source1',
        url_label: 'Label',
        has_overlay: false,
        release: invalidRelease,
      }

      expect(isMediaPromotionsItemDto(item as unknown as MediaPromotionsItemDto)).toBe(false)
    })
  })

  describe('isMediaPromotionsDto', () => {
    it('should return false if input is not an array', () => {
      expect(isMediaPromotionsDto({})).toBe(false)
      expect(isMediaPromotionsDto('not an array')).toBe(false)
      expect(isMediaPromotionsDto(null)).toBe(false)
    })

    it('should return true for an empty array', () => {
      expect(isMediaPromotionsDto([])).toBe(true)
    })

    it('should return true for a list of valid items', () => {
      const data: MediaPromotionsItemDto[] = [
        {
          id: '1',
          url: 'u1',
          image: undefined,
          title: 't1',
          is_ad: true,
          ad_erid: 'e1',
          ad_origin: 'o1',
          url_label: 'l1',
          has_overlay: false,
          release: undefined,
        },
        {
          id: '2',
          url: 'u2',
          image: validImage,
          title: 't2',
          is_ad: false,
          ad_erid: undefined,
          ad_origin: undefined,
          url_label: undefined,
          has_overlay: true,
          release: validRelease,
        },
      ]

      expect(isMediaPromotionsDto(data)).toBe(true)
    })

    it('should return false if any item in the array is invalid', () => {
      const data: unknown[] = [
        {
          id: '1',
          url: 'u1',
          image: undefined,
          title: 't1',
          is_ad: true,
          ad_erid: 'e1',
          ad_origin: 'o1',
          url_label: 'l1',
          has_overlay: false,
          release: undefined,
        },
        {
          id: 999, // Invalid id type (number)
          url: 'u2',
          image: undefined,
          title: 't2',
          is_ad: false,
          ad_erid: undefined,
          ad_origin: undefined,
          url_label: undefined,
          has_overlay: true,
          release: undefined,
        },
      ]

      expect(isMediaPromotionsDto(data as unknown as MediaPromotionsItemDto[])).toBe(false)
    })
  })
})
