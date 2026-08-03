import { describe, expect, it } from 'vitest'
import { mapMediaPromotionsDto } from '../mapper'
import { ImageMappers } from '../../../shared/image'
import { ReleaseMappers } from '../../../shared/release'

describe('mapMediaPromotionsDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const mockImageDto = { preview: 'p', thumbnail: 't' }
    const mockImage = ImageMappers.mapImageDto(mockImageDto)

    const mockReleaseDto = { id: 1, year: 2023, name: { main: 'Release Name' } }
    const mockRelease = ReleaseMappers.mapReleaseDto(mockReleaseDto)

    const dto = [
      {
        id: 'id-1',
        url: 'http://test.com',
        image: mockImageDto,
        title: 'Test Title',
        is_ad: true,
        ad_erid: 'erid-123',
        ad_origin: 'orig-1',
        url_label: 'label-1',
        has_overlay: false,
        release: mockReleaseDto,
      },
    ]

    const result = mapMediaPromotionsDto(dto)

    expect(result).toEqual([
      {
        id: 'id-1',
        url: 'http://test.com',
        image: mockImage,
        title: 'Test Title',
        isAd: true,
        adErid: 'erid-123',
        adOrigin: 'orig-1',
        urlLabel: 'label-1',
        hasOverlay: false,
        release: mockRelease,
      },
    ])
  })

  it('Converts undefined/missing fields to null', () => {
    const dto = [
      {
        id: 'id-1',
        // Other fields omitted
      },
    ]

    const result = mapMediaPromotionsDto(dto)

    expect(result[0]).toEqual({
      id: 'id-1',
      url: null,
      image: null,
      title: null,
      isAd: null,
      adErid: null,
      adOrigin: null,
      urlLabel: null,
      hasOverlay: null,
      release: null,
    })
  })

  it('Handles a mix of provided and missing optional fields', () => {
    const partialImageDto = { preview: 'p' }
    const partialImage = ImageMappers.mapImageDto(partialImageDto)

    const dto = [
      {
        id: 'id-1',
        title: 'Partial Title',
        is_ad: false,
        image: partialImageDto,
        release: null,
      },
    ]

    const result = mapMediaPromotionsDto(dto)

    expect(result[0]).toEqual({
      id: 'id-1',
      url: null,
      image: partialImage,
      title: 'Partial Title',
      isAd: false,
      adErid: null,
      adOrigin: null,
      urlLabel: null,
      hasOverlay: null,
      release: null,
    })
  })

  it('Returns an empty array when given an empty array', () => {
    expect(mapMediaPromotionsDto([])).toEqual([])
  })

  it('Maps multiple items correctly', () => {
    const dto = [
      { id: '1', title: 'First' },
      { id: '2', title: 'Second' },
    ]

    const result = mapMediaPromotionsDto(dto)

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('2')
  })

  // When internal mappers are not called because source fields are missing/null,
  // their output should naturally be null, which is handled by mapMediaPromotionsDto
  it('Sets nested objects to null if source fields are missing/null', () => {
    const dto = [
      {
        id: 'id-1',
        image: undefined,
        release: null,
      },
    ]

    const result = mapMediaPromotionsDto(dto)

    expect(result[0].image).toBeNull()
    expect(result[0].release).toBeNull()
  })
})
