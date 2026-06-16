/**
 * These types define the Media Videos schema.
 * DTO types represent raw responses directly from the API.
 * The non-Dto types are the internal library interfaces.
 */
export type MediaVideosDto = MediaVideosItemDto[]
export type MediaVideos = MediaVideosItem[]

/**
 * Query parameters for the Media Videos API.
 * - include / exclude: Only apply to top-level fields (nested fields cannot be removed).
 * - limit: Controls the number of videos returned in the response.
 */
export interface MediaVideosParams {
  limit?: number
  include?: (
    | 'id'
    | 'url'
    | 'title'
    | 'views'
    | 'image'
    | 'comments'
    | 'video_id'
    | 'created_at'
    | 'updated_at'
    | 'is_announce'
    | 'origin'
  )[]
  exclude?: (
    | 'id'
    | 'url'
    | 'title'
    | 'views'
    | 'image'
    | 'comments'
    | 'video_id'
    | 'created_at'
    | 'updated_at'
    | 'is_announce'
    | 'origin'
  )[]
}

/**
 * Raw DTO response for a Media Video item.
 * Fields are optional and can be undefined if omitted by the web API.
 */

export interface MediaVideosItemDto {
  id?: number
  url?: string
  title?: string
  views?: number
  image?: MediaVideosItemImageDto
  comments?: number
  video_id?: string
  created_at?: string
  updated_at?: string
  is_announce?: boolean
  origin?: MediaVideosItemOriginDto
}

export interface MediaVideosItemImageDto {
  preview?: string
  thumbnail?: string
  optimized?: MediaVideosItemImageOptimizedDto
}

export interface MediaVideosItemImageOptimizedDto {
  preview?: string
  thumbnail?: string
}

export interface MediaVideosItemOriginDto {
  id?: string
  url?: string
  type?: MediaVideoItemOriginTypeDto
  title?: string
  description?: string
  is_announce?: boolean
}

export interface MediaVideoItemOriginTypeDto {
  value?: string
  description?: string
}

/**
 * Library internal type for a Media Video item.
 * All properties are guaranteed to be present in the object.
 * If a field is missing from the API response, it will be populated as null.
 */

export interface MediaVideosItem {
  id: number | null
  url: string | null
  title: string | null
  views: number | null
  image: MediaVideosItemImage | null
  comments: number | null
  videoId: string | null
  createdAt: string | null
  updatedAt: string | null
  isAnnounce: boolean | null
  origin: MediaVideosItemOrigin
}

export interface MediaVideosItemImage {
  preview: string | null
  thumbnail: string | null
  optimized: MediaVideosItemImageOptimized | null
}

export interface MediaVideosItemImageOptimized {
  preview: string | null
  thumbnail: string | null
}

export interface MediaVideosItemOrigin {
  id: string | null
  url: string | null
  type: MediaVideoItemOriginType | null
  title: string | null
  description: string | null
  is_announce: boolean | null
}

export interface MediaVideoItemOriginType {
  value: string | null
  description: string | null
}
