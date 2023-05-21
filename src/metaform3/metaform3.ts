import { API_METHOD_PATH } from "./enums";
import { URLConstructor } from "./core";

/* Schemas */
import { Params, Objects, Responses } from "./schemas";

export interface IMetaform3 {
  getTitle(params: Params.GetTitleParams): Promise<Responses.GetTitleResponse>;
  // getTitleList: Options.IGetTitleListOptions;
  // getTitleUpdates: Options.IGetTitleUpdatesOptions;
  // getTitleChanges: Options.IGetTitleChangesOption;
  // getTitleSchedule: Options.IGetTitleScheduleOptions;
  // getTitleRandom: Options.IGetTitleRandomOptions;
  // getTitleSearch(): Promise<void>;
  // getTitleSearchAdvanced(): Promise<void>;
  // getTitleFranchises(): Promise<void>;
  // getYoutube(): Promise<void>;
  // getFeed(): Promise<void>;
  // getYears(): Promise<void>;
  // getGenres(): Promise<void>;
  // getTeam(): Promise<void>;
  // getTorrentSeedStat(): Promise<void>;
  // getTorrentRSS(): Promise<void>;
  // getFranchiseList(): Promise<void>;
  // getUser(): Promise<void>;
  // getUserFavorites(): Promise<void>;
  // putFavorites(): Promise<void>;
  // deleteFavorites(): Promise<void>;
}

type TimeoutFetchOptions = RequestInit & {
  timeout?: number;
};

export class Metaform3 implements IMetaform3 {
  private readonly _urlConst: URLConstructor;

  constructor() {
    this._urlConst = new URLConstructor();
  }

  protected async _fetch<T>(
    url: string,
    options: TimeoutFetchOptions
  ): Promise<T> {
    // Set default timeout if set anybody else
    const timeout =
      typeof options.timeout !== "undefined" ? options.timeout : 100 * 1000;

    // Create DOM abort controller
    const abortController = new AbortController();

    // Create request cancel timer
    const abortTimer = setTimeout(() => {
      abortController.abort();
    }, timeout);

    // Send request and await response or timeout
    const response = await fetch(url, {
      ...options,
      signal: abortController.signal,
    });

    // Remove timeout
    clearTimeout(abortTimer);

    // Return data
    return (await response.json()) as T;
  }

  async getTitle(
    params: Params.GetTitleParams
  ): Promise<Responses.GetTitleResponse> {
    const queryStr = "id=9000";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE)
      .setQueryString(queryStr)
      .construct();

    console.log(reqUrl);

    const data = await this._fetch<Objects.Title>(reqUrl, { timeout: 1000 });
    return {
      error: null,
      data,
    };
  }
}
