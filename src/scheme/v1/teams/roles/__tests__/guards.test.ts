import { describe, it, expect } from 'vitest'
import { isTeamsRolesApiResponse, isTeamsRolesApiResponseItem } from '../guards'

describe('Testing isTeamsRolesItemDto', () => {
  describe('Valid cases', () => {
    it('Passes with all fields present', () => {
      expect(
        isTeamsRolesApiResponseItem({
          id: '9872a949-9fe1-4ad9-ade4-d26b0bdbcb45',
          title: 'role title',
          color: '#FFFFFF',
          sort_order: 1,
        }),
      ).toBe(true)

      expect(
        isTeamsRolesApiResponseItem({
          id: '9872a949-9fe1-4ad9-ade4-d26b0bdbcb45',
          title: 'role title',
          color: undefined,
          sort_order: 1,
        }),
      ).toBe(true)
    })

    it('Passes with all fields undefined', () => {
      expect(isTeamsRolesApiResponseItem({})).toBe(true)
    })

    it('Passes with nullable color', () => {
      expect(isTeamsRolesApiResponseItem({ color: undefined })).toBe(true)
    })
  })

  describe('Invalid fields types', () => {
    it('Fails when id is null', () => {
      expect(isTeamsRolesApiResponseItem({ id: null })).toBe(false)
    })

    it('Fails when id is number', () => {
      expect(isTeamsRolesApiResponseItem({ id: 1 })).toBe(false)
    })

    it('Fails when id is string number', () => {
      expect(isTeamsRolesApiResponseItem({ id: '1233' })).toBe(false)
    })

    it('Fails when title is null', () => {
      expect(isTeamsRolesApiResponseItem({ title: null })).toBe(false)
    })

    it('Fails when title is number', () => {
      expect(isTeamsRolesApiResponseItem({ title: 123 })).toBe(false)
    })

    it('Fails when sort_order is string', () => {
      expect(isTeamsRolesApiResponseItem({ sort_order: 'sort_order' })).toBe(false)
    })

    it('Fails when sort_order is string number', () => {
      expect(isTeamsRolesApiResponseItem({ sort_order: '123' })).toBe(false)
    })

    it('Fails when sort_order is NaN', () => {
      expect(isTeamsRolesApiResponseItem({ sort_order: NaN })).toBe(false)
    })
  })

  describe('Invalid value types', () => {
    it('fails on null', () => expect(isTeamsRolesApiResponseItem(null)).toBe(false))
    it('fails on array', () => expect(isTeamsRolesApiResponseItem([])).toBe(false))
    it('fails on string', () => expect(isTeamsRolesApiResponseItem('string')).toBe(false))
    it('fails on number', () => expect(isTeamsRolesApiResponseItem(42)).toBe(false))
    it('fails on undefined', () => expect(isTeamsRolesApiResponseItem(undefined)).toBe(false))
  })
})

describe('Testing isTeamsRolesDto', () => {
  it('Passes with valid array', () => {
    expect(
      isTeamsRolesApiResponse([
        {
          id: '9872a949-9fe1-4ad9-ade4-d26b0bdbcb45',
          title: 'title',
          color: '#FFFFFF',
          sort_order: 1,
        },
        {
          title: 'title',
          color: undefined,
        },
      ]),
    ).toBe(true)
  })

  it('Passed with empty array', () => {
    expect(isTeamsRolesApiResponse([])).toBe(true)
  })

  it('Fail when one item is invalid', () => {
    expect(isTeamsRolesApiResponse([{ id: '1' }, { id: null }])).toBe(false)
  })

  it('Fails on non-array', () => {
    expect(isTeamsRolesApiResponse({})).toBe(false)
    expect(isTeamsRolesApiResponse(undefined)).toBe(false)
    expect(isTeamsRolesApiResponse(null)).toBe(false)
  })
})
