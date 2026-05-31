import { describe, it, expect } from 'vitest'
import { isTeamsRolesDto, isTeamsRolesItemDto } from '../guards'

describe('Testing isTeamsRolesItemDto', () => {
  describe('Valid cases', () => {
    it('Passes with all fields present', () => {
      expect(
        isTeamsRolesItemDto({
          id: 'identifier',
          title: 'role title',
          color: '#FFFFFF',
          sort_order: 1,
        }),
      ).toBe(true)

      expect(
        isTeamsRolesItemDto({
          id: 'identifier',
          title: 'role title',
          color: null,
          sort_order: 1,
        }),
      ).toBe(true)
    })

    it('Passes with all fields undefined', () => {
      expect(isTeamsRolesItemDto({})).toBe(true)
    })

    it('Passes with nullable color', () => {
      expect(isTeamsRolesItemDto({ color: null })).toBe(true)
    })
  })

  describe('Invalid fields types', () => {
    it('Fails when id is null', () => {
      expect(isTeamsRolesItemDto({ id: null })).toBe(false)
    })

    it('Fails when id is number', () => {
      expect(isTeamsRolesItemDto({ id: 1 })).toBe(false)
    })

    it('Fails when id is string number', () => {
      expect(isTeamsRolesItemDto({ id: '1233' })).toBe(false)
    })

    it('Fails when title is null', () => {
      expect(isTeamsRolesItemDto({ title: null })).toBe(false)
    })

    it('Fails when title is number', () => {
      expect(isTeamsRolesItemDto({ title: 123 })).toBe(false)
    })

    it('Fails when sort_order is string', () => {
      expect(isTeamsRolesItemDto({ sort_order: 'sort_order' })).toBe(false)
    })

    it('Fails when sort_order is string number', () => {
      expect(isTeamsRolesItemDto({ sort_order: '123' })).toBe(false)
    })

    it('Fails when sort_order is NaN', () => {
      expect(isTeamsRolesItemDto({ sort_order: NaN })).toBe(false)
    })
  })

  describe('Invalid value types', () => {
    it('fails on null', () => expect(isTeamsRolesItemDto(null)).toBe(false))
    it('fails on array', () => expect(isTeamsRolesItemDto([])).toBe(false))
    it('fails on string', () => expect(isTeamsRolesItemDto('string')).toBe(false))
    it('fails on number', () => expect(isTeamsRolesItemDto(42)).toBe(false))
    it('fails on undefined', () => expect(isTeamsRolesItemDto(undefined)).toBe(false))
  })
})

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
