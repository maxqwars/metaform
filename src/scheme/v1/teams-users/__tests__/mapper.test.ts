import { describe, expect, it } from 'vitest'
import { mapTeamsUsersDto, mapTeamsUsersUserAvatarImageDto, mapTeamsUsersUserDto } from '../mapper'

describe('mapTeamsUsersUserAvatarImageDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const dto = {
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
      optimized: {
        preview: 'optimized-preview-url',
        thumbnail: 'optimized-thumbnail-url',
      },
    }
    expect(mapTeamsUsersUserAvatarImageDto(dto)).toEqual({
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
      optimized: {
        preview: 'optimized-preview-url',
        thumbnail: 'optimized-thumbnail-url',
      },
    })
  })

  it('Converts undefined fields to null', () => {
    const dto = {}
    expect(mapTeamsUsersUserAvatarImageDto(dto)).toEqual({
      preview: null,
      thumbnail: null,
      optimized: undefined,
    })
  })

  it('Handles partial fields (preview and thumbnail provided, optimized missing)', () => {
    const dto = {
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
    }
    expect(mapTeamsUsersUserAvatarImageDto(dto)).toEqual({
      preview: 'preview-url',
      thumbnail: 'thumbnail-url',
      optimized: undefined,
    })
  })

  it('Maps optimized fields correctly even if they are partially missing', () => {
    const dto = {
      optimized: {
        preview: 'optimized-preview-url',
      },
    }
    expect(mapTeamsUsersUserAvatarImageDto(dto)).toEqual({
      preview: null,
      thumbnail: null,
      optimized: {
        preview: 'optimized-preview-url',
        thumbnail: null,
      },
    })
  })

  it('Maps optimized fields correctly even if they are partially missing', () => {
    const dto = {
      optimized: {
        preview: 'optimized-preview-url',
      },
    }
    expect(mapTeamsUsersUserAvatarImageDto(dto)).toEqual({
      preview: null,
      thumbnail: null,
      optimized: {
        preview: 'optimized-preview-url',
        thumbnail: null,
      },
    })
  })

  it('Maps optimized fields correctly when preview is missing but thumbnail is present', () => {
    const dto = {
      optimized: {
        thumbnail: 'thumbnail-url',
      },
    }
    expect(mapTeamsUsersUserAvatarImageDto(dto)).toEqual({
      preview: null,
      thumbnail: null,
      optimized: {
        preview: null,
        thumbnail: 'thumbnail-url',
      },
    })
  })
})

describe('mapTeamsUsersUserDto', () => {
  it('Maps all fields correctly when all are provided', () => {
    const dto = {
      id: 123,
      nickname: 'test_user',
      avatar: {
        preview: 'preview-url',
        thumbnail: 'thumbnail-url',
        optimized: {
          preview: 'opt-preview',
          thumbnail: 'opt-thumbnail',
        },
      },
    }

    expect(mapTeamsUsersUserDto(dto)).toEqual({
      id: 123,
      nickname: 'test_user',
      avatar: {
        preview: 'preview-url',
        thumbnail: 'thumbnail-url',
        optimized: {
          preview: 'opt-preview',
          thumbnail: 'opt-thumbnail',
        },
      },
    })
  })

  it('Converts undefined fields to null', () => {
    const dto = {}
    expect(mapTeamsUsersUserDto(dto)).toEqual({
      id: null,
      nickname: null,
      avatar: null,
    })
  })

  it('Handles missing avatar correctly', () => {
    const dto = {
      id: 1,
      nickname: 'no-avatar',
      avatar: undefined,
    }
    expect(mapTeamsUsersUserDto(dto)).toEqual({
      id: 1,
      nickname: 'no-avatar',
      avatar: null,
    })
  })

  it('Handles null avatar correctly', () => {
    const dto = {
      id: 1,
      nickname: 'null-avatar',
    }

    expect(mapTeamsUsersUserDto(dto)).toEqual({
      id: 1,
      nickname: 'null-avatar',
      avatar: null,
    })
  })

  it('Correctly maps nested avatar fields', () => {
    const dto = {
      id: 2,
      nickname: 'nested-test',
      avatar: {
        optimized: {
          preview: 'only-optimized-preview',
        },
      },
    }

    expect(mapTeamsUsersUserDto(dto)).toEqual({
      id: 2,
      nickname: 'nested-test',
      avatar: {
        preview: null,
        thumbnail: null,
        optimized: {
          preview: 'only-optimized-preview',
          thumbnail: null,
        },
      },
    })
  })
})

describe('mapTeamsUsersDto', () => {
  it('Maps all fields correctly including nested objects', () => {
    const dto = [
      {
        id: 'user-1',
        nickname: 'john_doe',
        is_intern: true,
        sort_order: 1,
        is_vacation: false,
        user: {
          id: 1,
          nickname: 'john_doe_full',
        },
        roles: [
          {
            id: 'role-1',
            title: 'admin',
            sort_order: 0,
            color: '#ff0000',
          },
        ],
        teams: [
          {
            id: 'team-1',
            title: 'Engineering',
          },
        ],
      },
    ]

    const result = mapTeamsUsersDto(dto)

    expect(result[0]).toEqual({
      id: 'user-1',
      nickname: 'john_doe',
      isIntern: true,
      sortOrder: 1,
      isVacation: false,
      user: {
        id: 1,
        nickname: 'john_doe_full',
        avatar: null,
      },
      roles: [
        {
          id: 'role-1',
          title: 'admin',
          sortOrder: 0,
          color: '#ff0000',
        },
      ],
      teams: [
        {
          id: 'team-1',
          title: 'Engineering',
          sortOrder: null,
          description: null,
        },
      ],
    })
  })

  it('Converts undefined fields to null and handles missing nested objects', () => {
    const dto = [
      {
        // id, nickname, is_intern, sort_order, is_vacation are all undefined
        // user, roles, teams are all undefined
      },
    ]

    expect(mapTeamsUsersDto(dto)).toEqual([
      {
        id: null,
        nickname: null,
        isIntern: null,
        sortOrder: null,
        isVacation: null,
        user: null,
        roles: null,
        teams: null,
      },
    ])
  })

  it('Handles partial missing nested objects', () => {
    const dto = [
      {
        id: 'user-2',
        nickname: 'jane_doe',
        roles: [], // Empty array
        // user and teams are missing
      },
    ]

    const result = mapTeamsUsersDto(dto)

    expect(result[0]).toEqual({
      id: 'user-2',
      nickname: 'jane_doe',
      isIntern: null,
      sortOrder: null,
      isVacation: null,
      user: null,
      roles: [],
      teams: null,
    })
  })

  it('Maps empty array to empty array', () => {
    expect(mapTeamsUsersDto([])).toEqual([])
  })

  it('Renames snake_case keys correctly', () => {
    const dto = [
      {
        is_intern: true,
        sort_order: 10,
        is_vacation: false,
      },
    ]

    const result = mapTeamsUsersDto(dto)[0]

    expect(result.isIntern).toBe(true)
    expect(result.sortOrder).toBe(10)
    expect(result.isVacation).toBe(false)
    expect(result).not.toHaveProperty('is_intern')
    expect(result).not.toHaveProperty('sort_order')
  })
})
