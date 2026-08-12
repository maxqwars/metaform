import { describe, it, expect } from 'vitest'
import { isTeamsApiResponseItem, isTeamsApiResponse } from '../guards'

describe('isTeamsItemDto', () => {
  describe('valid cases', () => {
    it('passes with all fields present', () => {
      expect(
        isTeamsApiResponseItem({
          id: '9872a949-9fe1-4ad9-ade4-d26b0bdbcb45',
          title: 'team',
          sort_order: 1,
          description: 'Desc',
        }),
      ).toBe(true)
    })

    it('passes with all fields undefined', () => {
      expect(isTeamsApiResponseItem({})).toBe(true)
    })

    it('passes with nullable description', () => {
      expect(isTeamsApiResponseItem({ description: null })).toBe(true)
    })
  })

  describe('invalid field types', () => {
    it('fails when id is null', () => {
      expect(isTeamsApiResponseItem({ id: null })).toBe(false)
    })

    it('fails when id is number', () => {
      expect(isTeamsApiResponseItem({ id: 123 })).toBe(false)
    })

    it('fails when title is null', () => {
      expect(isTeamsApiResponseItem({ title: null })).toBe(false)
    })

    it('fails when sort_order is string', () => {
      expect(isTeamsApiResponseItem({ sort_order: '1' })).toBe(false)
    })

    it('fails when sort_order is NaN', () => {
      expect(isTeamsApiResponseItem({ sort_order: NaN })).toBe(false)
    })

    it('fails when description is number', () => {
      expect(isTeamsApiResponseItem({ description: 123 })).toBe(false)
    })
  })

  describe('invalid value types', () => {
    it('fails on null', () => expect(isTeamsApiResponseItem(null)).toBe(false))
    it('fails on array', () => expect(isTeamsApiResponseItem([])).toBe(false))
    it('fails on string', () => expect(isTeamsApiResponseItem('string')).toBe(false))
    it('fails on number', () => expect(isTeamsApiResponseItem(42)).toBe(false))
    it('fails on undefined', () => expect(isTeamsApiResponseItem(undefined)).toBe(false))
  })
})

describe('isTeamsDto', () => {
  it('passes with valid array', () => {
    expect(
      isTeamsApiResponse([
        {
          id: '9872a949-9fe1-4ad9-ade4-d26b0bdbcb45',
          title: 'Team',
          sort_order: 1,
          description: null,
        },
        { id: '9872a949-9fe1-4ad9-ade4-d26b0bdbcb45' },
      ]),
    ).toBe(true)
  })

  it('passes with empty array', () => {
    expect(isTeamsApiResponse([])).toBe(true)
  })

  it('fails when one item is invalid', () => {
    expect(isTeamsApiResponse([{ id: '1' }, { id: null }])).toBe(false)
  })

  it('fails on non-array', () => {
    expect(isTeamsApiResponse({})).toBe(false)
  })
})
