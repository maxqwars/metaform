import { describe, it, expect } from 'vitest'
import { isTeamsItemDto, isTeamsDto } from '../guards'

describe('isTeamsItemDto', () => {
  describe('valid cases', () => {
    it('passes with all fields present', () => {
      expect(
        isTeamsItemDto({
          id: '1',
          title: 'Team',
          sort_order: 1,
          description: 'Desc',
        }),
      ).toBe(true)
    })

    it('passes with all fields undefined', () => {
      expect(isTeamsItemDto({})).toBe(true)
    })

    it('passes with nullable description', () => {
      expect(isTeamsItemDto({ description: null })).toBe(true)
    })
  })

  describe('invalid field types', () => {
    it('fails when id is null', () => {
      expect(isTeamsItemDto({ id: null })).toBe(false)
    })

    it('fails when id is number', () => {
      expect(isTeamsItemDto({ id: 123 })).toBe(false)
    })

    it('fails when title is null', () => {
      expect(isTeamsItemDto({ title: null })).toBe(false)
    })

    it('fails when sort_order is string', () => {
      expect(isTeamsItemDto({ sort_order: '1' })).toBe(false)
    })

    it('fails when sort_order is NaN', () => {
      expect(isTeamsItemDto({ sort_order: NaN })).toBe(false)
    })

    it('fails when description is number', () => {
      expect(isTeamsItemDto({ description: 123 })).toBe(false)
    })
  })

  describe('invalid value types', () => {
    it('fails on null', () => expect(isTeamsItemDto(null)).toBe(false))
    it('fails on array', () => expect(isTeamsItemDto([])).toBe(false))
    it('fails on string', () => expect(isTeamsItemDto('string')).toBe(false))
    it('fails on number', () => expect(isTeamsItemDto(42)).toBe(false))
    it('fails on undefined', () => expect(isTeamsItemDto(undefined)).toBe(false))
  })
})

describe('isTeamsDto', () => {
  it('passes with valid array', () => {
    expect(
      isTeamsDto([{ id: '1', title: 'Team', sort_order: 1, description: null }, { id: '2' }]),
    ).toBe(true)
  })

  it('passes with empty array', () => {
    expect(isTeamsDto([])).toBe(true)
  })

  it('fails when one item is invalid', () => {
    expect(
      isTeamsDto([
        { id: '1' },
        { id: null }, // невалидный
      ]),
    ).toBe(false)
  })

  it('fails on non-array', () => {
    expect(isTeamsDto({})).toBe(false)
  })
})
