import { describe, it, expect } from 'vitest'
import { serializeMediaVideosParams } from '../serialize-params'

describe('serializeMediaVideosParams', () => {
  it('Serializes include array to comma-separated string', () => {
    expect(
      serializeMediaVideosParams({
        include: ['id', 'title', 'views'],
      }),
    ).toEqual({ include: 'id,title,views' })
  })

  it('Serializes exclude array to comma-separated string', () => {
    expect(
      serializeMediaVideosParams({
        exclude: ['url', 'origin'],
      }),
    ).toEqual({ exclude: 'url,origin' })
  })

  it('Serializes limit to string', () => {
    expect(
      serializeMediaVideosParams({
        limit: 50,
      }),
    ).toEqual({ limit: '50' })
  })

  it('Serializes both include and exclude', () => {
    expect(
      serializeMediaVideosParams({
        include: ['id', 'title'],
        exclude: ['views'],
      }),
    ).toEqual({
      include: 'id,title',
      exclude: 'views',
    })
  })

  it('Serializes include, exclude and limit together', () => {
    expect(
      serializeMediaVideosParams({
        limit: 20,
        include: ['id', 'url'],
        exclude: ['comments'],
      }),
    ).toEqual({
      limit: '20',
      include: 'id,url',
      exclude: 'comments',
    })
  })

  it('Omits undefined include', () => {
    const result = serializeMediaVideosParams({})
    expect(result).not.toHaveProperty('include')
  })

  it('Omits undefined exclude', () => {
    const result = serializeMediaVideosParams({})
    expect(result).not.toHaveProperty('exclude')
  })

  it('Omits undefined limit', () => {
    const result = serializeMediaVideosParams({})
    expect(result).not.toHaveProperty('limit')
  })

  it('Returns empty object when no params', () => {
    expect(serializeMediaVideosParams({})).toEqual({})
  })
})
