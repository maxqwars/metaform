import { API_METHOD_PATH, METAFORM_ERROR } from "./enums";

import { URLConstructor } from "./core";
import { Object2QueryString } from "./Utils";

/* Schemas */
import { Params, Objects, Responses } from "./schemas";

export interface IMetaform3 {
  getTitle(params: Params.GetTitleParams): Promise<Responses.GetTitleResponse>;
  getTitleList(
    params: Params.GetTitleListParams
  ): Promise<Responses.GetTitleListResponse>;
  getGenres(): Promise<Responses.GetGenresResponse>;
  getYears(): Promise<Responses.GetYearsResponse>;
  getTeam(): Promise<Responses.GetTeamResponse>;
  // getTitleUpdates(params: Params.GetTitleUpdatesParams): Promise<void>;
  // getTitleChanges: Options.IGetTitleChangesOption;
  // getTitleSchedule: Options.IGetTitleScheduleOptions;
  getTitleRandom(
    params: Params.GetTitleRandomParams
  ): Promise<Responses.GetTitleResponse>;
  // getTitleSearch(): Promise<void>;
  // getTitleSearchAdvanced(): Promise<void>;
  // getTitleFranchises(): Promise<void>;
  // getYoutube(): Promise<void>;
  // getFeed(): Promise<void>;
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
