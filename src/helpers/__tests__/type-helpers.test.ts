import { describe, it, expect } from 'vitest'
import {
  isOptionalString,
  isValidString,
  isNullableString,
  isOptionalValidNumber,
  isValidNumber,
} from '../type-helpers'

describe('isOptionalString', () => {
  it('should return true when the value is undefined', () => {
    expect(isOptionalString(undefined)).toBe(true)
  })
  it('should return true when the value is a string', () => {
    expect(isOptionalString('hello')).toBe(true)
  })
  it('should return false when the value is null', () => {
    expect(isOptionalString(null)).toBe(false)
  })
  it('should return true when the value is not a non-empty string or a number', () => {
    expect(isOptionalString(123)).toBe(false)
    expect(isOptionalString({})).toBe(false)
  })
})

describe('isValidString', () => {
  it('should return false when the value is an empty string', () => {
    expect(isValidString('')).toBe(false)
  })
  it('should return true when the value is a non-empty string or a number', () => {
    expect(isValidString('hello')).toBe(true)
  })
  it('should return false when the value is null or undefined', () => {
    expect(isValidString(null)).toBe(false)
    expect(isValidString(undefined)).toBe(false)
  })
})

describe('isNullableString', () => {
  it('should return false when the value is undefined', () => {
    expect(isNullableString(undefined)).toBe(true)
  })
  it('should return true when the value is a string', () => {
    expect(isNullableString('hello')).toBe(true)
  })
  it('should return false when the value is null', () => {
    expect(isNullableString(null)).toBe(true)
  })
  it('should return true when the value is not a non-empty string or a number', () => {
    expect(isNullableString(123)).toBe(false)
    expect(isNullableString({})).toBe(false)
  })
})

describe('isOptionalValidNumber', () => {
  it('should return true when the value is undefined', () => {
    expect(isOptionalValidNumber(undefined)).toBe(true)
  })
  it('should return false when the value is a number', () => {
    expect(isOptionalValidNumber(123)).toBe(true)
  })
  it('should return true when the value is null', () => {
    expect(isOptionalValidNumber(null)).toBe(false)
  })
  it('should return true when the value is not a valid number', () => {
    expect(Object.is(isOptionalValidNumber(NaN), false)).toBe(true)
  })
})

describe('isValidNumber', () => {
  it('should return false when the value is not a number or a string', () => {
    expect(isValidNumber(NaN)).toBe(false)
    expect(isValidNumber({})).toBe(false)
  })
})
