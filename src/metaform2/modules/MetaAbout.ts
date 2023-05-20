import { MetaModule } from "../core";
import { MetaModuleOptions, MetaModuleResponse, TeamInfo } from "../types";
import { API_METHOD, MOD_ERR } from "../enums";

export class MetaAbout extends MetaModule {
  constructor(options?: MetaModuleOptions) {
    if (options) super(options);
    super();
  }

  async getTeam(): Promise<MetaModuleResponse<TeamInfo | null>> {
    const requestUrl = this._urlBuilder.useMethod(API_METHOD.GET_TEAM).build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {});
      const data = await response.json();
      return this._makeResponse<TeamInfo>(false, data);
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }
}
