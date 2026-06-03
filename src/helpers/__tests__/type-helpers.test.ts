import { describe, it, expect } from 'vitest'
import {
  isOptionalString,
  isValidString,
  isNullableString,
  isOptionalValidNumber,
  isValidNumber,
  isUuid,
  isOptionalBoolean,
  isOptionalNumber,
  isOptionalUuid,
  isRecord,
  isValidOptionalString,
} from '../type-helpers'

describe('Type Guards', () => {
  // isOptionalString
  it('should return true for undefined', () => {
    expect(isOptionalString(undefined)).toBe(true)
  })

  it('should return true for a string', () => {
    expect(isOptionalString('test')).toBe(true)
  })

  it('should return false for a number', () => {
    expect(isOptionalString(123)).toBe(false)
  })

  // isValidString
  it('should return true for a valid string', () => {
    expect(isValidString('test')).toBe(true)
  })

  it('should return false for an empty string', () => {
    expect(isValidString('')).toBe(false)
  })

  it('should return false for a numeric string', () => {
    expect(isValidString('123')).toBe(false)
  })

  // isOptionalNumber
  it('should return true for undefined', () => {
    expect(isOptionalNumber(undefined)).toBe(true)
  })

  it('should return true for a number', () => {
    expect(isOptionalNumber(123)).toBe(true)
  })

  it('should return false for a string', () => {
    expect(isOptionalNumber('test')).toBe(false)
  })

  // isValidNumber
  it('should return true for a valid number', () => {
    expect(isValidNumber(123)).toBe(true)
  })

  it('should return false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false)
  })

  it('should return false for Infinity', () => {
    expect(isValidNumber(Infinity)).toBe(false)
  })

  // isOptionalValidNumber
  it('should return true for undefined', () => {
    expect(isOptionalValidNumber(undefined)).toBe(true)
  })

  it('should return true for a valid number', () => {
    expect(isOptionalValidNumber(123)).toBe(true)
  })

  it('should return false for NaN', () => {
    expect(isOptionalValidNumber(NaN)).toBe(false)
  })

  // isNullableString
  it('should return true for undefined', () => {
    expect(isNullableString(undefined)).toBe(true)
  })

  it('should return true for null', () => {
    expect(isNullableString(null)).toBe(true)
  })

  it('should return true for a string', () => {
    expect(isNullableString('test')).toBe(true)
  })

  // isValidOptionalString
  it('should return true for undefined', () => {
    expect(isValidOptionalString(undefined)).toBe(true)
  })

  it('should return true for a valid string', () => {
    expect(isValidOptionalString('test')).toBe(true)
  })

  // isUuid
  it('should return true for a valid UUID', () => {
    const uuid = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
    expect(isUuid(uuid)).toBe(true)
  })

  it('should return false for an invalid UUID', () => {
    const invalidUuid = 'invalid-uuid'
    expect(isUuid(invalidUuid)).toBe(false)
  })

  // isOptionalUuid
  it('should return true for undefined', () => {
    expect(isOptionalUuid(undefined)).toBe(true)
  })

  it('should return true for a valid UUID', () => {
    const uuid = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
    expect(isOptionalUuid(uuid)).toBe(true)
  })

  // isOptionalBoolean
  it('should return true for undefined', () => {
    expect(isOptionalBoolean(undefined)).toBe(true)
  })

  it('should return true for a boolean', () => {
    expect(isOptionalBoolean(true)).toBe(true)
    expect(isOptionalBoolean(false)).toBe(true)
  })

  // isRecord
  it('should return true for an object', () => {
    const obj = { name: 'test' }
    expect(isRecord(obj)).toBe(true)
  })

  it('should return false for null', () => {
    expect(isRecord(null)).toBe(false)
  })

  it('should return false for an array', () => {
    expect(isRecord([1, 2, 3])).toBe(false)
  })
})
