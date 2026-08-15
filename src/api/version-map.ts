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
  teamsRoles: EndpointDef<
    SchemeV1.GetTeamsRolesMethod.GetTeamsRolesResponse,
    SchemeV1.GetTeamsRolesMethod.GetTeamsRolesQueryParams
  >
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
    teamsRoles: {
      guard: SchemeV1.GetTeamsRolesMethod.isGetTeamsRolesApiResponse,
      mapper: (v) =>
        SchemeV1.GetTeamsRolesMethod.toGetTeamsRolesResponse(
          v as SchemeV1.GetTeamsRolesMethod.GetTeamsRolesApiResponse,
        ),
      serializeParams: SchemeV1.GetTeamsRolesMethod.serializeGetTeamsRolesQueryParams,
      path: '/teams/roles',
    },
  },
}
