import { describe, it, expect } from 'vitest'
import { serializeMediaPromotionsParams } from '../serialize-params'

describe('serializeMediaPromotionsParams', () => {
  // Tests for serializing the include array into a comma-separated string
  it('Serializes include array to comma-separated string', () => {
    expect(
      serializeMediaPromotionsParams({
        include: ['id', 'title', 'image'],
      }),
    ).toEqual({ include: 'id,title,image' })
  })

  // Tests for serializing the exclude array into a comma-separated string
  it('Serializes exclude array to comma-separated string', () => {
    expect(
      serializeMediaPromotionsParams({
        exclude: ['url', 'ad_erid'],
      }),
    ).toEqual({ exclude: 'url,ad_erid' })
  })

  // Tests for serializing both include and exclude properties simultaneously
  it('Serializes both include and exclude', () => {
    expect(
      serializeMediaPromotionsParams({
        include: ['id', 'title'],
        exclude: ['has_overlay'],
      }),
    ).toEqual({
      include: 'id,title',
      exclude: 'has_overlay',
    })
  })

  // Tests for handling missing/undefined properties (should not be present in output)
  it('Omits undefined include', () => {
    const result = serializeMediaPromotionsParams({})
    expect(result).not.toHaveProperty('include')
  })

  it('Omits undefined exclude', () => {
    const result = serializeMediaPromotionsParams({})
    expect(result).not.toHaveProperty('exclude')
  })

  // Test for empty input object returning an empty result object
  it('Returns empty object when no params', () => {
    expect(serializeMediaPromotionsParams({})).toEqual({})
  })
})
