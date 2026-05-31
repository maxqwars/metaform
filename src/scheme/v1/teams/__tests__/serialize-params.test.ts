import { describe, it, expect } from 'vitest'
import { serializeTeamsParams } from '../serialize-params'

describe('serializeTeamsParams', () => {
  it('serializes include array to comma-separated string', () => {
    expect(
      serializeTeamsParams({
        include: ['id', 'title'],
      }),
    ).toEqual({ include: 'id,title' })
  })

  it('serializes exclude array to comma-separated string', () => {
    expect(
      serializeTeamsParams({
        exclude: ['description'],
      }),
    ).toEqual({ exclude: 'description' })
  })

  it('serializes both include and exclude', () => {
    expect(
      serializeTeamsParams({
        include: ['id', 'title'],
        exclude: ['description'],
      }),
    ).toEqual({
      include: 'id,title',
      exclude: 'description',
    })
  })

  it('omits undefined include', () => {
    const result = serializeTeamsParams({})
    expect(result).not.toHaveProperty('include')
  })

  it('omits undefined exclude', () => {
    const result = serializeTeamsParams({})
    expect(result).not.toHaveProperty('exclude')
  })

  it('returns empty object when no params', () => {
    expect(serializeTeamsParams({})).toEqual({})
  })
})
