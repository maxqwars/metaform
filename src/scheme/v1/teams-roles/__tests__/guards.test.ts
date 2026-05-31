import { describe, it, expect } from 'vitest'
import { isTeamsRolesDto, isTeamsRolesItemDto } from '../guards'

describe('Testing isTeamsRolesDto', () => {
  it('Passes with valid array', () => {
    expect(
      isTeamsRolesDto([
        {
          id: 'identifier',
          title: 'role title',
          color: '#FFFFFF',
          sort_order: 1,
        },
        {
          title: 'role title',
          color: null,
        },
      ]),
    ).toBe(true)
  })

  it('Passed with empty array', () => {
    expect(isTeamsRolesDto([])).toBe(true)
  })

  it('Fail when one item is invalid', () => {
    expect(isTeamsRolesDto([{ id: '1' }, { id: null }])).toBe(false)
  })

  it('Fails on non-array', () => {
    expect(isTeamsRolesDto({})).toBe(false)
    expect(isTeamsRolesDto(undefined)).toBe(false)
    expect(isTeamsRolesDto(null)).toBe(false)
  })
})
