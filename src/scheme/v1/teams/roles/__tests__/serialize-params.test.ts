import { describe, it, expect } from 'vitest'
import { serializeTeamsRolesParams } from '../serialize-params'

describe('serializeTeamsParams', () => {
  it('Serializes include array to comma-separated string', () => {
    expect(
      serializeTeamsRolesParams({
        include: ['id', 'title'],
      }),
    ).toEqual({ include: 'id,title' })
  })

  it('Serializes exclude array to comma-separated string', () => {
    expect(
      serializeTeamsRolesParams({
        exclude: ['sort_order'],
      }),
    ).toEqual({ exclude: 'sort_order' })
  })

  it('Serializes both include and exclude', () => {
    expect(
      serializeTeamsRolesParams({
        include: ['id', 'title'],
        exclude: ['sort_order'],
      }),
    ).toEqual({
      include: 'id,title',
      exclude: 'sort_order',
    })
  })

  it('Omits undefined include', () => {
    const result = serializeTeamsRolesParams({})
    expect(result).not.toHaveProperty('include')
  })

  it('Omits undefined exclude', () => {
    const result = serializeTeamsRolesParams({})
    expect(result).not.toHaveProperty('exclude')
  })

  it('Returns empty object when no params', () => {
    expect(serializeTeamsRolesParams({})).toEqual({})
  })
})
