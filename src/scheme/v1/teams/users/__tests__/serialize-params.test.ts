import { describe, it, expect } from 'vitest'
import { serializeTeamsUsersParams } from '../serialize-params'

describe('serializeTeamsParams', () => {
  it('Serializes include array to comma-separated string', () => {
    expect(
      serializeTeamsUsersParams({
        include: ['id', 'user'],
      }),
    ).toEqual({ include: 'id,user' })
  })

  it('Serializes exclude array to comma-separated string', () => {
    expect(
      serializeTeamsUsersParams({
        exclude: ['sort_order'],
      }),
    ).toEqual({ exclude: 'sort_order' })
  })

  it('Serializes both include and exclude', () => {
    expect(
      serializeTeamsUsersParams({
        include: ['id', 'user'],
        exclude: ['sort_order'],
      }),
    ).toEqual({
      include: 'id,user',
      exclude: 'sort_order',
    })
  })

  it('Omits undefined include', () => {
    const result = serializeTeamsUsersParams({})
    expect(result).not.toHaveProperty('include')
  })

  it('Omits undefined exclude', () => {
    const result = serializeTeamsUsersParams({})
    expect(result).not.toHaveProperty('exclude')
  })

  it('Returns empty object when no params', () => {
    expect(serializeTeamsUsersParams({})).toEqual({})
  })
})
