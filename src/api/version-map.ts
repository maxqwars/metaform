// Import scheme for /teams V1
import type { Teams as TeamsV1 } from '../scheme/v1/teams'
import type { TeamsDto as TeamsDtoV1 } from '../scheme/v1/teams'
import type { TeamsParams as TeamsParamsV1 } from '../scheme/v1/teams'
import { isTeamsDto as isTeamsDtoV1 } from '../scheme/v1/teams'
import { mapTeamsDto as mapTeamsDtoV1 } from '../scheme/v1/teams'
import { serializeTeamsParams as serializeTeamsParamsV1 } from '../scheme/v1/teams'

// Import scheme for /teams/role V1
import type { TeamsRoles as TeamsRolesV1 } from '../scheme/v1/teams-roles'
import type { TeamsRolesDto as TeamsRolesDtoV1 } from '../scheme/v1/teams-roles'
import type { TeamsRolesParams as TeamsRolesParamsV1 } from '../scheme/v1/teams-roles'
import { isTeamsRolesDto as isTeamsRolesDtoV1 } from '../scheme/v1/teams-roles'
import { mapTeamsRolesDto as mapTeamsRolesDtoV1 } from '../scheme/v1/teams-roles'
import { serializeTeamsRolesParams as serializeTeamsRolesParamsV1 } from '../scheme/v1/teams-roles'

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
      path: '/teams/role',
    },
  },
}
