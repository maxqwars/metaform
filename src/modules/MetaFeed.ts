import { MetaModule } from "../core";
import {
  MetaModuleOptions,
  MetaModuleResponse,
  GetScheduleQueryParams,
  ScheduleItem,
  YouTubeEmbedVideo,
  GetYouTubeQueryParams,
} from "../types";
import { API_METHOD, MOD_ERR } from "../enums";
import { SamplingQueryBuilder, FormatQueryBuilder } from "../utils";

type YouTubeEmbedRaw = {
  id?: number;
  title?: string;
  image?: string;
  preview?: {
    src?: string;
    thumbnail?: string;
  };
  youtube_id?: string;
  comments?: number;
  views?: number;
  timestamp?: number;
};

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

  async getYouTube(
    params?: GetYouTubeQueryParams
  ): Promise<MetaModuleResponse<YouTubeEmbedVideo[] | null>> {
    // Construct request url
    const API_REQUEST_URL = this._urlBuilder
      .useMethod(API_METHOD.GET_YOUTUBE)
      .build();

    try {
      const req = await this._fetchWithTimeout(API_REQUEST_URL, {});
      const data: YouTubeEmbedRaw[] = await req.json();

      const transformed = data.map((embedRaw) =>
        this._youtubeEmbedRawToYouTubeEmbedVid(embedRaw)
      );

      return this._makeResponse<YouTubeEmbedVideo[]>(false, transformed);
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  getFeed() {
    // TODO: Implement MetaFeed.getFeed()
    throw Error("Not implemented");
  }

  getRSS() {
    // TODO: Implement MetaFeed.getRSS()
    throw Error("Not implemented");
  }

  private _youtubeEmbedRawToYouTubeEmbedVid(
    raw: YouTubeEmbedRaw
  ): YouTubeEmbedVideo {
    return {
      id: raw.id || undefined,
      title: raw.title || undefined,
      image: raw.image || undefined,
      preview: {
        src: raw.preview?.src || undefined,
        thumbnail: raw.preview?.src || undefined,
      },
      youtubeId: raw.youtube_id || undefined,
      comments: raw.comments || undefined,
      views: raw.views || undefined,
      timestamp: raw.timestamp || undefined,
    };
  }
}
