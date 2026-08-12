import { describe, it, expect } from 'vitest'
import { serializeTeamsRolesQueryParams } from '../serialize-params'

describe('serializeTeamsParams', () => {
  it('Serializes include array to comma-separated string', () => {
    expect(
      serializeTeamsRolesQueryParams({
        include: ['id', 'title'],
      }),
    ).toEqual({ include: 'id,title' })
  })

  it('Serializes exclude array to comma-separated string', () => {
    expect(
      serializeTeamsRolesQueryParams({
        exclude: ['sort_order'],
      }),
    ).toEqual({ exclude: 'sort_order' })
  })

  it('Serializes both include and exclude', () => {
    expect(
      serializeTeamsRolesQueryParams({
        include: ['id', 'title'],
        exclude: ['sort_order'],
      }),
    ).toEqual({
      include: 'id,title',
      exclude: 'sort_order',
    })
  })

  it('Omits undefined include', () => {
    const result = serializeTeamsRolesQueryParams({})
    expect(result).not.toHaveProperty('include')
  })

  it('Omits undefined exclude', () => {
    const result = serializeTeamsRolesQueryParams({})
    expect(result).not.toHaveProperty('exclude')
  })

  it('Returns empty object when no params', () => {
    expect(serializeTeamsRolesQueryParams({})).toEqual({})
  })
})
