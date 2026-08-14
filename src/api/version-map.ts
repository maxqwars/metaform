import * as SchemeV1 from '../scheme/v1'

interface EndpointDef<TResult, TParams, TPathParams = undefined> {
  guard: (v: unknown) => boolean
  mapper: (v: unknown) => TResult
  serializeParams: (params: TParams) => Record<string, string>
  serializePathParams?: (params: TPathParams) => Record<string, string>
  path: string
}

interface V1Endpoints {
  teams: EndpointDef<
    SchemeV1.GetTeamsMethod.GetTeamsResponse,
    SchemeV1.GetTeamsMethod.GetTeamsQueryParams
  >
  // teamsRoles: EndpointDef<
  //   SchemeV1.Teams.Roles.Scheme.TeamsRoles,
  //   SchemeV1.Teams.Roles.Scheme.TeamsRolesParams
  // >
  // teamsUsers: EndpointDef<
  //   SchemeV1.Teams.Users.Scheme.TeamsUsers,
  //   SchemeV1.Teams.Users.Scheme.TeamsUsersParams
  // >
  // mediaVideos: EndpointDef<
  //   SchemeV1.Media.Videos.Scheme.MediaVideos,
  //   SchemeV1.Media.Videos.Scheme.MediaVideosParams
  // >
  // mediaPromotions: EndpointDef<
  //   SchemeV1.Media.Promotions.Scheme.MediaPromotions,
  //   SchemeV1.Media.Promotions.Scheme.MediaPromotionsParams
  // >
}

export interface VersionMap {
  v1: V1Endpoints
}

export const versions: VersionMap = {
  v1: {
    teams: {
      guard: SchemeV1.GetTeamsMethod.isGetTeamsApiResponse,
      mapper: (v) =>
        SchemeV1.GetTeamsMethod.toGetTeamsResponse(
          v as SchemeV1.GetTeamsMethod.GetTeamsApiResponse,
        ),
      serializeParams: SchemeV1.GetTeamsMethod.serializeGetTeamsQueryParams,
      path: '/teams',
    },
  },
  // v1: {
  //   teams: {
  //     guard: SchemeV1.Teams.Guards.isTeamsDto,
  //     mapper: (v) => SchemeV1.Teams.Mappers.mapTeamsDto(v as SchemeV1.Teams.Scheme.TeamsDto),
  //     serializeParams: SchemeV1.Teams.serializeParams,
  //     path: '/teams',
  //   },
  //   teamsRoles: {
  //     guard: SchemeV1.Teams.Roles.Guards.isTeamsRolesDto,
  //     mapper: (v) =>
  //       SchemeV1.Teams.Roles.Mappers.mapTeamsRolesDto(
  //         v as SchemeV1.Teams.Roles.Scheme.TeamsRolesDto,
  //       ),
  //     serializeParams: SchemeV1.Teams.Roles.serializeParams,
  //     path: '/teams/roles',
  //   },
  //   teamsUsers: {
  //     guard: SchemeV1.Teams.Users.Guards.isTeamsUsersDto,
  //     mapper: (v) =>
  //       SchemeV1.Teams.Users.Mappers.mapTeamsUsersDto(
  //         v as SchemeV1.Teams.Users.Scheme.TeamsUsersDto,
  //       ),
  //     serializeParams: SchemeV1.Teams.Users.serializeParams,
  //     path: '/teams/users',
  //   },
  //   mediaVideos: {
  //     guard: SchemeV1.Media.Videos.Guards.isMediaVideosDto,
  //     mapper: (v) =>
  //       SchemeV1.Media.Videos.Mappers.mapMediaVideosDto(
  //         v as SchemeV1.Media.Videos.Scheme.MediaVideosDto,
  //       ),
  //     serializeParams: SchemeV1.Media.Videos.serializeParams,
  //     path: '/media/videos',
  //   },
  //   mediaPromotions: {
  //     guard: SchemeV1.Media.Promotions.Guards.isMediaPromotionsDto,
  //     mapper: (v) =>
  //       SchemeV1.Media.Promotions.Mappers.mapMediaPromotionsDto(
  //         v as SchemeV1.Media.Promotions.Scheme.MediaPromotionsDto,
  //       ),
  //     serializeParams: SchemeV1.Media.Promotions.serializeParams,
  //     path: '/media/promotions',
  //   },
  // },
}
