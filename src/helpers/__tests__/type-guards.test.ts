import { describe, expect, it } from 'vitest'
import {
  isArray,
  isBigInt,
  isDate,
  isDecimalNumber,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isInteger,
  isNaNValue,
  isNonEmptyArray,
  isNull,
  isNullableOptional,
  isNumber,
  isObject,
  isOptional,
  isPlainObject,
  isSafeInteger,
  isURL,
  isURLPath,
  isUUID,
} from '../type-guards'

// Local predicate helpers, used only to exercise the isOptional/isNullableOptional factories.
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

describe('isOptional', () => {
  const isOptionalString = isOptional(isString)

  it('returns true when the value is undefined', () => {
    expect(isOptionalString(undefined)).toBe(true)
  })

  it('returns true when the value satisfies the predicate', () => {
    expect(isOptionalString('hello')).toBe(true)
  })

  it('returns false when the value does not satisfy the predicate', () => {
    expect(isOptionalString(42)).toBe(false)
  })

  it('returns false for null (not treated as optional)', () => {
    expect(isOptionalString(null)).toBe(false)
  })
})

describe('isNullableOptional', () => {
  const isNullableString = isNullableOptional(isString)

  it('returns true when the value is undefined', () => {
    expect(isNullableString(undefined)).toBe(true)
  })

  it('returns true when the value is null', () => {
    expect(isNullableString(null)).toBe(true)
  })

  it('returns true when the value satisfies the predicate', () => {
    expect(isNullableString('hello')).toBe(true)
  })

  it('returns false when the value does not satisfy the predicate', () => {
    expect(isNullableString(42)).toBe(false)
  })
})

describe('isEmptyString', () => {
  it('returns true for an empty string', () => {
    expect(isEmptyString('')).toBe(true)
  })

  it('returns false for a non-empty string', () => {
    expect(isEmptyString('a')).toBe(false)
  })

  it('returns false for a non-string value', () => {
    expect(isEmptyString(123)).toBe(false)
    expect(isEmptyString(null)).toBe(false)
    expect(isEmptyString(undefined)).toBe(false)
  })
})

describe('isNumber', () => {
  it('returns true for a finite number', () => {
    expect(isNumber(5)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-3.14)).toBe(true)
  })

  it('returns false for NaN', () => {
    expect(isNumber(NaN)).toBe(false)
  })

  it('returns false for Infinity / -Infinity', () => {
    expect(isNumber(Infinity)).toBe(false)
    expect(isNumber(-Infinity)).toBe(false)
  })

  it('returns false for a non-number value', () => {
    expect(isNumber('5')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
  })
})

describe('isDecimalNumber', () => {
  it('returns true for a finite number', () => {
    expect(isDecimalNumber(5.5)).toBe(true)
    expect(isDecimalNumber(0)).toBe(true)
  })

  it('returns false for NaN (short-circuits on !Number.isNaN)', () => {
    expect(isDecimalNumber(NaN)).toBe(false)
  })

  it('returns false for Infinity / -Infinity', () => {
    expect(isDecimalNumber(Infinity)).toBe(false)
    expect(isDecimalNumber(-Infinity)).toBe(false)
  })

  it('returns false for a non-number value', () => {
    expect(isDecimalNumber('5.5')).toBe(false)
    expect(isDecimalNumber(undefined)).toBe(false)
  })
})

describe('isObject', () => {
  it('returns true for a plain object', () => {
    expect(isObject({})).toBe(true)
  })

  it('returns true for an array (typeof object, not null)', () => {
    expect(isObject([])).toBe(true)
  })

  it('returns true for a Date instance', () => {
    expect(isObject(new Date())).toBe(true)
  })

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('returns false for a non-object value', () => {
    expect(isObject(5)).toBe(false)
    expect(isObject('a')).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})

describe('isPlainObject', () => {
  it('returns true for a plain object', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1 })).toBe(true)
  })

  it('returns false for an array', () => {
    expect(isPlainObject([])).toBe(false)
  })

  it('returns false for null', () => {
    expect(isPlainObject(null)).toBe(false)
  })

  it('returns false for a non-object value', () => {
    expect(isPlainObject(5)).toBe(false)
    expect(isPlainObject('a')).toBe(false)
  })
})

describe('isArray', () => {
  it('returns true for an array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
  })

  it('returns false for a non-array value', () => {
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray('array')).toBe(false)
  })
})

describe('isNull', () => {
  it('returns true for null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('returns false for undefined', () => {
    expect(isNull(undefined)).toBe(false)
  })

  it('returns false for any other value', () => {
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull({})).toBe(false)
  })
})

describe('isUUID', () => {
  it('returns true for a valid lowercase UUID', () => {
    expect(isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
  })

  it('returns true for a valid uppercase UUID (case-insensitive)', () => {
    expect(isUUID('123E4567-E89B-12D3-A456-426614174000')).toBe(true)
  })

  it('returns false for a malformed UUID string', () => {
    expect(isUUID('not-a-uuid')).toBe(false)
    expect(isUUID('123e4567-e89b-12d3-a456')).toBe(false)
  })

  it('returns false for a non-string value', () => {
    expect(isUUID(12345)).toBe(false)
    expect(isUUID(null)).toBe(false)
  })
})

describe('isURL', () => {
  it('returns true for a valid http URL', () => {
    expect(isURL('http://example.com')).toBe(true)
  })

  it('returns true for a valid https URL', () => {
    expect(isURL('https://example.com/path?query=1')).toBe(true)
  })

  it('returns false for a malformed URL string', () => {
    expect(isURL('not a url')).toBe(false)
    expect(isURL('ftp://example.com')).toBe(false)
  })

  it('returns false for a non-string value', () => {
    expect(isURL(123)).toBe(false)
    expect(isURL(undefined)).toBe(false)
  })
})

describe('isURLPath', () => {
  it('returns true for a valid absolute path', () => {
    expect(isURLPath('/foo/bar')).toBe(true)
  })

  it('returns false for a non-string value', () => {
    expect(isURLPath(123)).toBe(false)
    expect(isURLPath(null)).toBe(false)
  })

  it('returns false for an empty string', () => {
    expect(isURLPath('')).toBe(false)
  })

  it('returns false for a path not starting with "/"', () => {
    expect(isURLPath('foo/bar')).toBe(false)
  })

  it('returns false for a protocol-relative path starting with "//"', () => {
    expect(isURLPath('//evil.com')).toBe(false)
  })
})

describe('isInteger', () => {
  it('returns true for an integer', () => {
    expect(isInteger(5)).toBe(true)
    expect(isInteger(0)).toBe(true)
    expect(isInteger(-10)).toBe(true)
  })

  it('returns false for a non-integer number', () => {
    expect(isInteger(5.5)).toBe(false)
  })

  it('returns false for a non-number value', () => {
    expect(isInteger('5')).toBe(false)
    expect(isInteger(undefined)).toBe(false)
  })
})

describe('isSafeInteger', () => {
  it('returns true for a safe integer', () => {
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
  })

  it('returns false for an unsafe integer', () => {
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(false)
  })

  it('returns false for a non-number value', () => {
    expect(isSafeInteger('9007199254740991')).toBe(false)
    expect(isSafeInteger(null)).toBe(false)
  })
})

describe('isNaNValue', () => {
  it('returns true for NaN', () => {
    expect(isNaNValue(NaN)).toBe(true)
  })

  it('returns false for a non-NaN number', () => {
    expect(isNaNValue(5)).toBe(false)
  })

  it('returns false for a non-number value', () => {
    expect(isNaNValue('NaN')).toBe(false)
    expect(isNaNValue(undefined)).toBe(false)
  })
})

describe('isBigInt', () => {
  it('returns true for a bigint', () => {
    expect(isBigInt(BigInt(10))).toBe(true)
    expect(isBigInt(10n)).toBe(true)
  })

  it('returns false for a non-bigint value', () => {
    expect(isBigInt(10)).toBe(false)
    expect(isBigInt('10')).toBe(false)
  })
})

describe('isDate', () => {
  it('returns true for a valid Date instance', () => {
    expect(isDate(new Date())).toBe(true)
  })

  it('returns false for an invalid Date instance', () => {
    expect(isDate(new Date('invalid'))).toBe(false)
  })

  it('returns false for a non-Date value', () => {
    expect(isDate('2024-01-01')).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate(Date.now())).toBe(false)
  })
})

describe('isEmptyArray', () => {
  it('returns true for an empty array', () => {
    expect(isEmptyArray([])).toBe(true)
  })

  it('returns false for a non-empty array', () => {
    expect(isEmptyArray([1])).toBe(false)
  })

  it('returns false for a non-array value', () => {
    expect(isEmptyArray({})).toBe(false)
    expect(isEmptyArray(null)).toBe(false)
  })
})

describe('isNonEmptyArray', () => {
  it('returns true for a non-empty array', () => {
    expect(isNonEmptyArray([1])).toBe(true)
    expect(isNonEmptyArray([1, 2, 3])).toBe(true)
  })

  it('returns false for an empty array', () => {
    expect(isNonEmptyArray([])).toBe(false)
  })

  it('returns false for a non-array value', () => {
    expect(isNonEmptyArray({})).toBe(false)
    expect(isNonEmptyArray(undefined)).toBe(false)
  })
})

describe('isEmptyObject', () => {
  it('returns true for a plain object with no own keys', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  it('returns false for a plain object with own keys', () => {
    expect(isEmptyObject({ a: 1 })).toBe(false)
  })

  it('returns false for a non-plain-object value (array, null)', () => {
    expect(isEmptyObject([])).toBe(false)
    expect(isEmptyObject(null)).toBe(false)
  })
})
