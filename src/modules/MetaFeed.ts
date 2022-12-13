import { MetaModule } from "../core";
import {
  MetaModuleOptions,
  MetaModuleResponse,
  GetScheduleQueryParams,
  ScheduleItem,
} from "../types";
import { API_METHOD, MOD_ERR } from "../enums";
import { SamplingQueryBuilder, FormatQueryBuilder } from "../utils";

export class MetaFeed extends MetaModule {
  constructor(options?: MetaModuleOptions) {
    if (options) super(options);
    super();
  }

  async getSchedule(
    params?: GetScheduleQueryParams
  ): Promise<MetaModuleResponse<ScheduleItem[] | null>> {
    // Init query builders
    const samplingQB = new SamplingQueryBuilder();
    const formatQB = new FormatQueryBuilder();

    const samplingQueryString = samplingQB
      .filter(params?.filter)
      .include(params?.include)
      .remove(params?.remove)
      .build();

    const formatQueryString = formatQB
      .descriptionFormat(params?.descriptionFormat)
      .playlistFormat(params?.playlistFormat)
      .build();

    let finalQueryString = "";

    // Concat query params
    if (samplingQueryString) finalQueryString += samplingQueryString;
    if (formatQueryString) finalQueryString += `&${formatQueryString}`;
    if (params?.days) finalQueryString += `&days=${params.days.join(",")}`;

    // Construct API request URL
    const apiRequestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_SCHEDULE)
      .useQuery(finalQueryString)
      .build();

    try {
      const data = await (
        await this._fetchWithTimeout(apiRequestUrl, {})
      ).json();
      return this._makeResponse<ScheduleItem[]>(false, data);
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  getYouTube() {
    // TODO: Implement MetaFeed.getYouTube()
    throw Error("Not implemented");
  }

  getFeed() {
    // TODO: Implement MetaFeed.getFeed()
    throw Error("Not implemented");
  }

  getRSS() {
    // TODO: Implement MetaFeed.getRSS()
    throw Error("Not implemented");
  }
}
