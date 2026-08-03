// Import scheme for /teams V1
import type { Teams as TeamsV1 } from '../scheme/v1/teams'
import type { TeamsDto as TeamsDtoV1 } from '../scheme/v1/teams'
import type { TeamsParams as TeamsParamsV1 } from '../scheme/v1/teams'
import { isTeamsDto as isTeamsDtoV1 } from '../scheme/v1/teams/guards'
import { mapTeamsDto as mapTeamsDtoV1 } from '../scheme/v1/teams/mapper'
import { serializeTeamsParams as serializeTeamsParamsV1 } from '../scheme/v1/teams/serialize-params'

// Import scheme for /teams/role V1
import type { TeamsRoles as TeamsRolesV1 } from '../scheme/v1/teams/roles'
import type { TeamsRolesDto as TeamsRolesDtoV1 } from '../scheme/v1/teams/roles'
import type { TeamsRolesParams as TeamsRolesParamsV1 } from '../scheme/v1/teams/roles'
import { isTeamsRolesDto as isTeamsRolesDtoV1 } from '../scheme/v1/teams/roles/guards'
import { mapTeamsRolesDto as mapTeamsRolesDtoV1 } from '../scheme/v1/teams/roles/mapper'
import { serializeTeamsRolesParams as serializeTeamsRolesParamsV1 } from '../scheme/v1/teams/roles/serialize-params'

// Import scheme for /teams/users V1
import type { TeamsUsers as TeamsUsersV1 } from '../scheme/v1/teams/users'
import type { TeamsUsersDto as TeamsUsersDtoV1 } from '../scheme/v1/teams/users'
import type { TeamsUsersParams as TeamsUsersParamsV1 } from '../scheme/v1/teams/users'
import { isTeamsUsersDto as isTeamsUsersDtoV1 } from '../scheme/v1/teams/users/guards'
import { mapTeamsUsersDto as mapTeamsUsersDtoV1 } from '../scheme/v1/teams/users/mapper'
import { serializeTeamsUsersParams as serializeTeamsUsersParamsV1 } from '../scheme/v1/teams/users/serialize-params'

// Import scheme for /media/videos V1
import * as MediaVideosV1 from '../scheme/v1/media/videos'
// import type { MediaVideos as MediaVideosV1 } from '../scheme/v1/media/videos'
// import type { MediaVideosDto as MediaVideosDtoV1 } from '../scheme/v1/media/videos'
// import type { MediaVideosParams as MediaVideosParamsV1 } from '../scheme/v1/media/videos'
// import { isMediaVideosDto as isMediaVideosDtoV1 } from '../scheme/v1/media/videos/guards'
// import { mapMediaVideosDto as mapMediaVideosDtoV1 } from '../scheme/v1/media/videos/mapper'
// import { serializeMediaVideosParams as serializeMediaVideosParamsV1 } from '../scheme/v1/media/videos/serialize-params'

interface EndpointDef<TResult, TParams, TPathParams = undefined> {
  guard: (v: unknown) => boolean
  mapper: (v: unknown) => TResult
  serializeParams: (params: TParams) => Record<string, string>
  serializePathParams?: (params: TPathParams) => Record<string, string>
  path: string
}

interface V1Endpoints {
  teams: EndpointDef<TeamsV1, TeamsParamsV1>
  teamsRoles: EndpointDef<TeamsRolesV1, TeamsRolesParamsV1>
  teamsUsers: EndpointDef<TeamsUsersV1, TeamsUsersParamsV1>
  mediaVideos: EndpointDef<
    MediaVideosV1.MediaVideosTypes.MediaVideos,
    MediaVideosV1.MediaVideosTypes.MediaVideosParams
  >
}

export interface VersionMap {
  v1: V1Endpoints
}

export const versions: VersionMap = {
  v1: {
    teams: {
      guard: isTeamsDtoV1,
      mapper: (v) => mapTeamsDtoV1(v as TeamsDtoV1),
      serializeParams: serializeTeamsParamsV1,
      path: '/teams',
    },
    teamsRoles: {
      guard: isTeamsRolesDtoV1,
      mapper: (v) => mapTeamsRolesDtoV1(v as TeamsRolesDtoV1),
      serializeParams: serializeTeamsRolesParamsV1,
      path: '/teams/roles',
    },
    teamsUsers: {
      guard: isTeamsUsersDtoV1,
      mapper: (v) => mapTeamsUsersDtoV1(v as TeamsUsersDtoV1),
      serializeParams: serializeTeamsUsersParamsV1,
      path: '/teams/users',
    },
    mediaVideos: {
      guard: MediaVideosV1.MediaVideosTypeGuards.isMediaVideosDto,
      mapper: (v) =>
        MediaVideosV1.MediaVideosMappers.mapMediaVideosDto(
          v as MediaVideosV1.MediaVideosTypes.MediaVideosDto,
        ),
      serializeParams: MediaVideosV1.serializeMediaVideosParams,
      path: '/media/videos',
    },
  },
}
