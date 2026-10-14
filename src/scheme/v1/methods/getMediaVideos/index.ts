import { Video } from '@/scheme/v1'

export type GetMediaVideosApiResponse = Video.scheme.VideoContentApiResponse[]
export type GetMediaVideosResponse = Video.scheme.VideoContent[]

export interface GetMediaVideosQueryParams {
  include?: Video.scheme.VideoContentFieldsPaths[]
  exclude?: Video.scheme.VideoContentFieldsPaths[]
  limit?: number
}

export function isGetMediaVideosApiResponse(value: unknown): value is GetMediaVideosApiResponse {
  return Array.isArray(value) && value.every(Video.guards.isVideoContentApiResponse)
}

export function toGetMediaVideosResponse(dto: GetMediaVideosApiResponse): GetMediaVideosResponse {
  return dto.map((value) => Video.mappers.toVideoContent(value))
}

export function serializeGetMediaVideosQueryParams(
  params: GetMediaVideosQueryParams,
): Record<string, string> {
  return {
    ...(params.include && { include: params.include.join(',') }),
    ...(params.exclude && { exclude: params.exclude.join(',') }),
    ...(params.limit && { limit: params.limit.toString() }),
  }
}
