import { describe, expect, it } from 'vitest'
import { mapTeamsRolesToDomain } from '../mapper'

describe('mapTeamsRolesDto', () => {
  it('Maps all fields correctly', () => {
    expect(
      mapTeamsRolesToDomain([
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
    expect(mapTeamsRolesToDomain([{}])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        color: null,
      },
    ])
  })

  it('Preserves null color', () => {
    expect(mapTeamsRolesToDomain([{ color: undefined }])).toEqual([
      {
        id: null,
        title: null,
        sortOrder: null,
        color: null,
      },
    ])
  })

  it('Maps empty array to empty array', () => {
    expect(mapTeamsRolesToDomain([])).toEqual([])
  })

  it('Renames sort_order to sortOrder', () => {
    const result = mapTeamsRolesToDomain([{ sort_order: 5 }])
    if (result[0]) expect(result[0].sortOrder).toBe(5)
    expect(result[0]).not.toHaveProperty('sort_order')
  })
})
