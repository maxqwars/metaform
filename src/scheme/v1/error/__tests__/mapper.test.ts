import { describe, expect, it } from 'vitest'
import { toApiError } from '../mappers'
import type * as ErrorTypes from '../types'

describe('toApiErrorBody', () => {
  it('should map message and field errors when both are present', () => {
    const dto: ErrorTypes.ApiErrorResponse = {
      message: 'Validation failed',
      errors: { login: ['Required field'] },
    }

    expect(toApiError(dto)).toStrictEqual({
      message: 'Validation failed',
      fieldErrors: { login: ['Required field'] },
    })
  })

  it('should convert undefined fields to null', () => {
    expect(toApiError({})).toStrictEqual({
      message: null,
      fieldErrors: null,
    })
  })

  it('should map a message-only error (e.g. 404/500) without field errors', () => {
    expect(toApiError({ message: 'Not found' })).toStrictEqual({
      message: 'Not found',
      fieldErrors: null,
    })
  })
})
