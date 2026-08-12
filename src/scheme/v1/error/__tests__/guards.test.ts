import { describe, it, expect } from 'vitest'
import { isApiErrorDto } from '../guards'

describe('isApiErrorDto', () => {
  it('should return true for a DTO with only a message', () => {
    expect(isApiErrorDto({ message: 'Not found' })).toBe(true)
  })

  it('should return true for a DTO with only field errors (422 shape)', () => {
    expect(isApiErrorDto({ errors: { login: ['Required field'] } })).toBe(true)
  })

  it('should return true for a DTO with both message and errors', () => {
    expect(isApiErrorDto({ message: 'Validation failed', errors: { login: ['too short'] } })).toBe(
      true,
    )
  })

  it('should return true for an empty object', () => {
    expect(isApiErrorDto({})).toBe(true)
  })

  it('should return false for inputs that are not records', () => {
    expect(isApiErrorDto('string')).toBe(false)
    expect(isApiErrorDto(123)).toBe(false)
    expect(isApiErrorDto(null)).toBe(false)
    expect(isApiErrorDto(undefined)).toBe(false)
  })

  it('should return false if message is not a string', () => {
    expect(isApiErrorDto({ message: 123 })).toBe(false)
  })

  it('should return false if errors values are not string arrays', () => {
    expect(isApiErrorDto({ errors: { login: 'not-an-array' } })).toBe(false)
    expect(isApiErrorDto({ errors: { login: [123] } })).toBe(false)
  })
})
