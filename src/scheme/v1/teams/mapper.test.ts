import { describe, it, expect } from 'vitest'
import { mapTeamsDto } from './mapper'

describe('mapTeamsDto', () => {
  it('maps all fields correctly', () => {
    expect(
      mapTeamsDto([
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
    expect(mapTeamsDto([{}])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        description: null,
      },
    ])
  })

  it('preserves null description', () => {
    expect(mapTeamsDto([{ description: null }])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        description: null,
      },
    ])
  })

  it('maps empty array to empty array', () => {
    expect(mapTeamsDto([])).toEqual([])
  })

  it('maps multiple items independently', () => {
    const result = mapTeamsDto([{ id: '1' }, { id: '2' }])
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('2')
  })

  it('renames sort_order to sortOrder', () => {
    const result = mapTeamsDto([{ sort_order: 5 }])
    expect(result[0].sortOrder).toBe(5)
    expect(result[0]).not.toHaveProperty('sort_order')
  })
})
