import { describe, expect, it } from 'vitest'
import { mapTeamsRolesDto } from '../mapper'

describe('mapTeamsRolesDto', () => {
  it('Maps all fields correctly', () => {
    expect(
      mapTeamsRolesDto([
        {
          id: 'hh64r-h34y67r-h347rh',
          title: 'role-title-field',
          sort_order: 1,
          color: '#ffffff',
        },
      ]),
    ).toEqual([
      {
        id: 'hh64r-h34y67r-h347rh',
        title: 'role-title-field',
        sortOrder: 1,
        color: '#ffffff',
      },
    ])
  })

  it('Converts undefined fields to null', () => {
    expect(mapTeamsRolesDto([{}])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        color: null,
      },
    ])
  })

  it('Preserves null color', () => {
    expect(mapTeamsRolesDto([{ color: null }])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        color: null,
      },
    ])
  })

  it('Maps empty array to empty array', () => {
    expect(mapTeamsRolesDto([])).toEqual([])
  })

  it('Renames sort_order to sortOrder', () => {
    const result = mapTeamsRolesDto([{ sort_order: 5 }])
    expect(result[0].sortOrder).toBe(5)
    expect(result[0]).not.toHaveProperty('sort_order')
  })
})
