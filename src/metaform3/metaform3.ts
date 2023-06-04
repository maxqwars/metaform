import { API_METHOD_PATH, METAFORM_ERROR } from "./enums";

import { URLConstructor } from "./core";
import { Object2QueryString } from "./utils";

/* Schemas */
import { Params, Objects, Responses } from "./schemas";

export interface IMetaform3 {
  /* -------------------------------------------------------------------------- */
  /*                     Methods that return composite types                    */
  /* -------------------------------------------------------------------------- */
  getTitleList(
    params: Params.GetTitleListParams
  ): Promise<Responses.GetTitleListResponse>;

  getTitleRandom(
    params: Params.GetTitleRandomParams
  ): Promise<Responses.GetTitleResponse>;

  // TODO: Implement method title/updates
  // getTitleUpdates(params: Params.GetTitleUpdatesParams): Promise<void>;

  // TODO: Implement method title/changes
  // getTitleChanges: Options.IGetTitleChangesOption;

  // TODO: Implement method title/schedule
  // getTitleSchedule: Options.IGetTitleScheduleOptions;

  // TODO: Implement method title/search
  // getTitleSearch(): Promise<void>;

  // TODO: Implement method title/search/advanced
  // getTitleSearchAdvanced(): Promise<void>;

  // TODO: Implement method title/franshises
  // getTitleFranchises(): Promise<void>;

  // TODO: Implement method /youtube
  // getYoutube(): Promise<void>;

  // TODO: Implement method /feed
  // getFeed(): Promise<void>;

  // TODO: Implement method torrent/seed_stats
  // getTorrentSeedStat(): Promise<void>;

  // TODO: Implement method torrent/rss
  // getTorrentRSS(): Promise<void>;

  // TODO: Implement method franshise/list
  // getFranchiseList(): Promise<void>;

  // TODO: Implement method /user
  // getUser(): Promise<void>;

  // TODO: Implement method GET user/favorites
  // getUserFavorites(): Promise<void>;

  // TODO: Implement method PUT user/favorites
  // putFavorites(): Promise<void>;

  // TODO: Implement method DELETE user/favorites
  // deleteFavorites(): Promise<void>;

  /* -------------------------------------------------------------------------- */
  /*                      Methods that return simple types                      */
  /* -------------------------------------------------------------------------- */
  getTitle(params: Params.GetTitleParams): Promise<Responses.GetTitleResponse>;
  getGenres(): Promise<Responses.GetGenresResponse>;
  getYears(): Promise<Responses.GetYearsResponse>;
  getTeam(): Promise<Responses.GetTeamResponse>;
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
    return (await response.json()) as T;
  }

  protected _getQuery(params: unknown) {
    return Object2QueryString(params as { [key: string]: unknown });
  }

  async getTitle(
    params: Params.GetTitleParams
  ): Promise<Responses.GetTitleResponse> {
    const queryStr = this._getQuery(params);
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._fetch<Objects.Title>(reqUrl, {});
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        return {
          error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
          data: null,
        };
      }

      if (error instanceof DOMException) {
        return {
          error: METAFORM_ERROR.TIMEOUT_ERR,
          data: null,
        };
      }

      return {
        error: METAFORM_ERROR.UNKNOWN_ERR,
        data: null,
      };
    }
  }

  async getTitleRandom(
    params: Params.GetTitleRandomParams
  ): Promise<Responses.GetTitleResponse> {
    const queryStr = params ? this._getQuery(params) : "";

    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_RANDOM)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._fetch<Objects.Title>(reqUrl, {});
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        return {
          error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
          data: null,
        };
      }

      if (error instanceof DOMException) {
        return {
          error: METAFORM_ERROR.TIMEOUT_ERR,
          data: null,
        };
      }

      return {
        error: METAFORM_ERROR.UNKNOWN_ERR,
        data: null,
      };
    }
  }

  async getTitleList(
    params: Params.GetTitleListParams
  ): Promise<Responses.GetTitleListResponse> {
    const queryStr = this._getQuery(params);
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_LIST)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._fetch<Objects.Title[]>(reqUrl, {});
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        return {
          error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
          data: null,
        };
      }

      if (error instanceof DOMException) {
        return {
          error: METAFORM_ERROR.TIMEOUT_ERR,
          data: null,
        };
      }

      return {
        error: METAFORM_ERROR.UNKNOWN_ERR,
        data: null,
      };
    }
  }

  async getYears(): Promise<Responses.GetYearsResponse> {
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_YEARS)
      .construct();

    try {
      const data = await this._fetch<number[]>(reqUrl, {});
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        return {
          error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
          data: null,
        };
      }

      if (error instanceof DOMException) {
        return {
          error: METAFORM_ERROR.TIMEOUT_ERR,
          data: null,
        };
      }

      return {
        error: METAFORM_ERROR.UNKNOWN_ERR,
        data: null,
      };
    }
  }

  async getGenres(): Promise<Responses.GetGenresResponse> {
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_GENRES)
      .construct();

    try {
      const data = await this._fetch<string[]>(reqUrl, {});
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        return {
          error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
          data: null,
        };
      }

      if (error instanceof DOMException) {
        return {
          error: METAFORM_ERROR.TIMEOUT_ERR,
          data: null,
        };
      }

      return {
        error: METAFORM_ERROR.UNKNOWN_ERR,
        data: null,
      };
    }
  }

  async getTeam(): Promise<Responses.GetTeamResponse> {
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TEAM)
      .construct();

    try {
      const data = await this._fetch<Objects.TitleTeam>(reqUrl, {});
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        return {
          error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
          data: null,
        };
      }

      if (error instanceof DOMException) {
        return {
          error: METAFORM_ERROR.TIMEOUT_ERR,
          data: null,
        };
      }

      return {
        error: METAFORM_ERROR.UNKNOWN_ERR,
        data: null,
      };
    }
  }
}
