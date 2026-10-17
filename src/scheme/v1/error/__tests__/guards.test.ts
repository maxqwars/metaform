import { describe, it, expect } from 'vitest'
import { isApiErrorScheme } from '../guards'

describe('isApiErrorDto', () => {
  it('should return true for a DTO with only a message', () => {
    expect(isApiErrorScheme({ message: 'Not found' })).toBe(true)
  })

  it('should return true for a DTO with only field errors (422 shape)', () => {
    expect(isApiErrorScheme({ errors: { login: ['Required field'] } })).toBe(true)
  })

  it('should return true for a DTO with both message and errors', () => {
    expect(isApiErrorScheme({ message: 'Validation failed', errors: { login: ['too short'] } })).toBe(true)
  })

  it('should return true for an empty object', () => {
    expect(isApiErrorScheme({})).toBe(true)
  })

  it('should return false for inputs that are not records', () => {
    expect(isApiErrorScheme('string')).toBe(false)
    expect(isApiErrorScheme(123)).toBe(false)
    expect(isApiErrorScheme(null)).toBe(false)
    expect(isApiErrorScheme(undefined)).toBe(false)
  })

  it('should return false if message is not a string', () => {
    expect(isApiErrorScheme({ message: 123 })).toBe(false)
  })

  it('should return false if errors values are not string arrays', () => {
    expect(isApiErrorScheme({ errors: { login: 'not-an-array' } })).toBe(false)
    expect(isApiErrorScheme({ errors: { login: [123] } })).toBe(false)
  })
})
