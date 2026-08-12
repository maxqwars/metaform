import { describe, it, expect } from 'vitest'
import { mapTeamsToDomain } from '../mapper'

describe('mapTeamsDto', () => {
  it('maps all fields correctly', () => {
    expect(
      mapTeamsToDomain([
        {
          id: '1',
          title: 'Team',
          sort_order: 1,
          description: 'Desc',
        },
      ]),
    ).toEqual([
      {
        id: '1',
        title: 'Team',
        sortOrder: 1,
        description: 'Desc',
      },
    ])
  })

  it('converts undefined fields to null', () => {
    expect(mapTeamsToDomain([{}])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        description: null,
      },
    ])
  })

  it('preserves null description', () => {
    expect(mapTeamsToDomain([{ description: undefined }])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        description: null,
      },
    ])
  })

  it('maps empty array to empty array', () => {
    expect(mapTeamsToDomain([])).toEqual([])
  })

  it('maps multiple items independently', () => {
    const result = mapTeamsToDomain([{ id: '1' }, { id: '2' }])
    expect(result).toHaveLength(2)
    if (result[0] && result[1]) {
      expect(result[0].id).toBe('1')
      expect(result[1].id).toBe('2')
    }
  })

  it('renames sort_order to sortOrder', () => {
    const result = mapTeamsToDomain([{ sort_order: 5 }])
    if (result[0]) {
      expect(result[0].sortOrder).toBe(5)
      expect(result[0]).not.toHaveProperty('sort_order')
    }
  })
})
