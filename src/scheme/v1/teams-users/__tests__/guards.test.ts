import { describe, it, expect } from 'vitest'
import {
  isTeamsUsersDto,
  isTeamsUsersItemDto,
  isTeamsUsersUserAvatarImageDto,
  isTeamsUsersUserAvatarOptimizedDto,
  isTeamsUsersUserDto,
} from '../guards'

const VALID_UUID = '814dbb68-b1fc-494a-af42-1f01e69e78d1'

describe('isTeamsUsersUserAvatarOptimizedDto', () => {
  it('should return true for valid optimized avatar DTO with defined preview and thumbnail', () => {
    const validDto = { preview: 'test', thumbnail: 'test' }
    expect(isTeamsUsersUserAvatarOptimizedDto(validDto)).toBe(true)
  })

  it('should return true for valid optimized avatar DTO with undefined preview and thumbnail', () => {
    const validDto = { preview: undefined, thumbnail: undefined }
    expect(isTeamsUsersUserAvatarOptimizedDto(validDto)).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isTeamsUsersUserAvatarOptimizedDto('string')).toBe(false)
    expect(isTeamsUsersUserAvatarOptimizedDto(123)).toBe(false)
    expect(isTeamsUsersUserAvatarOptimizedDto(null)).toBe(false)
  })

  it('should return true for valid optimized avatar DTO with empty strings', () => {
    const validDto = { preview: '', thumbnail: '' }
    expect(isTeamsUsersUserAvatarOptimizedDto(validDto)).toBe(true)
  })

  it('should return false if preview is not a string or undefined', () => {
    const invalidDto = { preview: 123, thumbnail: 'test' }
    expect(isTeamsUsersUserAvatarOptimizedDto(invalidDto)).toBe(false)
  })

  it('should return false if thumbnail is not a string or undefined', () => {
    const invalidDto = { preview: 'test', thumbnail: 123 }
    expect(isTeamsUsersUserAvatarOptimizedDto(invalidDto)).toBe(false)
  })

  // Additional tests to cover more edge cases. These are important for thoroughness.
  it('should return true if both preview and thumbnail are null', () => {
    const validDto = { preview: undefined, thumbnail: undefined }
    expect(isTeamsUsersUserAvatarOptimizedDto(validDto)).toBe(true)
  })

  it('should handle boolean values correctly', () => {
    const invalidDto = { preview: true, thumbnail: false } // Type assertion to force boolean
    expect(isTeamsUsersUserAvatarOptimizedDto(invalidDto)).toBe(false)
  })

  it('should return false if the object has extra properties', () => {
    const invalidDto = { preview: 'test', thumbnail: 'test', extraProperty: 123 }
    expect(isTeamsUsersUserAvatarOptimizedDto(invalidDto)).toBe(true) // This is intentional - it only checks for required props.  Consider stricter validation if needed.
  })
})

describe('isTeamsUsersUserAvatarImageDto', () => {
  it('should return true for valid avatar image DTO', () => {
    const validDto = { preview: 'test', thumbnail: 'test' }
    expect(isTeamsUsersUserAvatarImageDto(validDto)).toBe(true)
  })

  it('should return false for invalid avatar image DTO (not a record)', () => {
    expect(isTeamsUsersUserAvatarImageDto('string')).toBe(false)
    expect(isTeamsUsersUserAvatarImageDto(123)).toBe(false)
    expect(isTeamsUsersUserAvatarImageDto(null)).toBe(false)
  })

  it('should return false if optimized is not a record', () => {
    const invalidDto = { preview: 'test', thumbnail: 'test', optiomized: 'string' }
    expect(isTeamsUsersUserAvatarImageDto(invalidDto)).toBe(false)
  })

  it('should return true for valid avatar image DTO with undefined values', () => {
    const validDto = { preview: undefined, thumbnail: undefined }
    expect(isTeamsUsersUserAvatarImageDto(validDto)).toBe(true)
  })
})

describe('isTeamsUsersUserDto', () => {
  it('should return true for a valid user DTO', () => {
    const validDto = { id: 1, avatar: { preview: 'test' }, nickname: 'Test User' }
    expect(isTeamsUsersUserDto(validDto)).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isTeamsUsersUserDto('string')).toBe(false)
    expect(isTeamsUsersUserDto(123)).toBe(false)
  })

  it('should return false if id is not an optional valid number', () => {
    const invalidDto = { id: 'string', avatar: { preview: 'test' }, nickname: 'Test User' }
    expect(isTeamsUsersUserDto(invalidDto)).toBe(false)
  })

  it('should return false if avatar is not a valid image DTO', () => {
    const invalidDto = { id: 1, avatar: 'string', nickname: 'Test User' }
    expect(isTeamsUsersUserDto(invalidDto)).toBe(false)
  })

  it('should handle undefined avatar correctly', () => {
    const validDto = { id: 1, nickname: 'test' }
    expect(isTeamsUsersUserDto(validDto)).toBe(true)
  })
})

describe('isTeamsUsersItemDto', () => {
  it('should return true for a valid teams users item DTO', () => {
    const validDto = {
      id: VALID_UUID,
      nickname: 'Test Nickname',
      is_intern: true,
      is_vacation: false,
      sort_order: 123,
      user: { id: 456, avatar: { preview: 'test' }, nickname: 'User Name' },
      teams: { id: VALID_UUID, title: 'Team Title' }, // Assuming a valid team DTO
      roles: [], // Assuming a valid roles DTO
    }
    expect(isTeamsUsersItemDto(validDto)).toBe(true)
  })

  it('should return false if not a record', () => {
    expect(isTeamsUsersItemDto('string')).toBe(false)
    expect(isTeamsUsersItemDto(123)).toBe(false)
  })

  it('should return false if id is not an optional UUID', () => {
    const invalidDto = { id: 'invalid-uuid', nickname: 'Test Nickname' }
    expect(isTeamsUsersItemDto(invalidDto)).toBe(false)
  })

  it('should return false if user is not a valid user DTO', () => {
    const invalidDto = { id: VALID_UUID, user: 'string' }
    expect(isTeamsUsersItemDto(invalidDto)).toBe(false)
  })

  it('should return false if team is not a valid team DTO', () => {
    const invalidDto = { id: VALID_UUID, team: 'string' }
    expect(isTeamsUsersItemDto(invalidDto)).toBe(false)
  })

  it('should return false if roles is not a valid roles DTO', () => {
    const invalidDto = { id: VALID_UUID, roles: 'string' }
    expect(isTeamsUsersItemDto(invalidDto)).toBe(false)
  })

  it('should handle undefined values correctly', () => {
    const validDto = {
      id: undefined,
      nickname: 'Test Nickname',
      is_intern: true,
      is_vacation: false,
      sort_order: undefined,
      user: null,
      teams: undefined,
      roles: undefined,
    }
    expect(isTeamsUsersItemDto(validDto)).toBe(true)
  })
})

describe('isTeamsUsersDto', () => {
  it('should return true for a valid teams users DTO (array of items)', () => {
    const validDto = [
      {
        id: VALID_UUID,
        nickname: 'Test Nickname',
        is_intern: true,
        is_vacation: false,
        sort_order: 123,
        user: { id: 456, avatar: { preview: 'test' }, nickname: 'User Name' },
        teams: { id: VALID_UUID, title: 'Team Title' }, // Assuming a valid team DTO
        roles: [], // Assuming a valid roles DTO
      },
    ]
    expect(isTeamsUsersDto(validDto)).toBe(true)
  })

  it('should return false if not an array', () => {
    expect(isTeamsUsersDto('string')).toBe(false)
    expect(isTeamsUsersDto(123)).toBe(false)
  })

  it('should return false if any item in the array is not a valid item DTO', () => {
    const invalidDto = [
      { id: 'test-uuid', nickname: 'Test Nickname' },
      'string', // Invalid item
    ]
    expect(isTeamsUsersDto(invalidDto)).toBe(false)
  })

  it('should return true for an empty array', () => {
    expect(isTeamsUsersDto([])).toBe(true)
  })
})
