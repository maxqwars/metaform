import { API_METHOD_PATH, METAFORM_ERROR } from "./enums";

import { URLConstructor } from "./core";
import { Object2QueryString, extractDomainFromUrl } from "./utils";

/* Schemas */
import { Params, Objects, Responses } from "./schemas";

export type MetaformOptions = {
  apiVer: string;
  apiDomain: string;
  https: boolean;
  timeout: number;
};

/* Define default request timeout */
const DEFAULT_FETCH_TIMEOUT = 10000;

export interface IMetaform3 {
  /* -------------------------------------------------------------------------- */
  /*                     Methods that return composite types                    */
  /* -------------------------------------------------------------------------- */
  getTitleList(
    params: Params.GetTitleListParams
  ): Promise<Responses.GetTitleListResponse>;

  getTitleRandom(
    params?: Params.GetTitleRandomParams
  ): Promise<Responses.GetTitleResponse>;

  getTitleUpdates(
    params?: Params.GetTitleChangesAndUpdatesParams
  ): Promise<Responses.GetTitleChangesAndUpdatesResponse>;

  getTitleChanges(
    params?: Params.GetTitleChangesAndUpdatesParams
  ): Promise<Responses.GetTitleChangesAndUpdatesResponse>;

  getTitleSchedule(
    params?: Params.GetTitleScheduleParams
  ): Promise<Responses.GetTitleScheduleResponse>;

  getTitleSearch(
    params: Params.GetTitleSearchParams
  ): Promise<Responses.GetTitleSearchResponse>;

  getTitleFranchises(
    params: Params.GetTitleFranchisesParams
  ): Promise<Responses.GetTitleFranshisesResponse>;

  getYoutube(
    params?: Params.GetYoutubeParams
  ): Promise<Responses.GetYoutubeResponse>;

  getTorrentSeedStats(
    params?: Params.GetTorrentsSeedStatsParams
  ): Promise<Responses.GetTorrentSeedStatsResponse>;

  getFranchiseList(
    params: Params.FranshiseListParams
  ): Promise<Responses.GetFranshiseListResponse>;

  // TODO: Implement method title/search/advanced
  // getTitleSearchAdvanced(): Promise<void>;

  // TODO: Implement method /feed
  // getFeed(): Promise<void>;

  // TODO: Implement method torrent/rss
  // getTorrentRSS(): Promise<void>;

  // TODO: Implement method /user
  // getUser(): Promise<void>;

  // TODO: Implement method GET user/favorites
  // getUserFavorites(): Promise<void>;

  // TODO: Implement method PUT user/favorites
  // putFavorites(): Promise<void>;

  // TODO: Implement method DELETE user/favorites
  // deleteFavorites(): Promise<void>;

  login(email: string, password: string): Promise<string | null>;

  // TODO: Implement method logout
  // logout(): Promise<void>

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
  private readonly _urlConst: URLConstructor; // Module for construct request urls
  private readonly _loginUrl: string; // Pre-defined url for auth
  private readonly _logoutUrl: string; // Pre-defined url for de-auth
  private readonly _timeout: number; // Request default timeout

  constructor(options?: MetaformOptions) {
    if (options) {
      const { apiVer, apiDomain, https, timeout } = options;
      this._urlConst = new URLConstructor(apiVer, apiDomain, https);

      const domain = this._urlConst.domain;
      const rootDomain = extractDomainFromUrl(domain);
      this._loginUrl = `https://${rootDomain}/public/login.php`;
      this._logoutUrl = `https://${rootDomain}/public/logout.php`;
      this._timeout = timeout;
    } else {
      this._urlConst = new URLConstructor();
      const domain = this._urlConst.domain;
      const rootDomain = extractDomainFromUrl(domain);
      this._loginUrl = `https://${rootDomain}/public/login.php`;
      this._logoutUrl = `https://${rootDomain}/public/logout.php`;
      this._timeout = DEFAULT_FETCH_TIMEOUT;
    }
  }

  /**
   * Prepare user credentials before send
   *
   * @private
   * @param {string} email User ```login``` or ```email```
   * @param {string} password User password
   * @return {*}  {string}
   * @memberof Metaform3
   */
  private _encodeUserCredentials(email: string, password: string): string {
    const keys = [
      `${encodeURIComponent("mail")}=${encodeURIComponent(email)}`,
      `${encodeURIComponent("passwd")}=${encodeURIComponent(password)}`,
    ];

    return keys.join("&");
  }

  protected _required(arg: unknown) {
    return !arg;
  }

  /**
   * Modified fetch() method, added timeout option
   *
   * @protected
   * @param {string} url Request URL
   * @param {TimeoutFetchOptions} options Extended fetch() options
   * @return {*}
   * @memberof Metaform3
   */
  protected async _fetch(url: string, options: TimeoutFetchOptions) {
    // Set default timeout if set anybody else
    const timeout =
      typeof options.timeout !== "undefined" ? options.timeout : this._timeout;

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
    return response;
  }

  /**
   * Method for fetch JSON data
   *
   * @protected
   * @template T
   * @param {string} url
   * @return {*}  {Promise<T>}
   * @memberof Metaform3
   */
  protected async _requestData<T>(url: string): Promise<T> {
    const response = await this._fetch(url, {});
    return (await response.json()) as T;
  }

  protected _getQuery(params: unknown) {
    return Object2QueryString(params as { [key: string]: unknown });
  }

  protected _getError(error: unknown) {
    /* RosKomNadzor block */
    if (error instanceof TypeError) {
      return {
        error: METAFORM_ERROR.DEPTH_ZERO_SELF_SIGNED_CERT,
        data: null,
      };
    }

    /* Time-out error */
    if (error instanceof DOMException) {
      return {
        error: METAFORM_ERROR.TIMEOUT_ERR,
        data: null,
      };
    }

    /* Unknown (default, placeholder) error */
    return {
      error: METAFORM_ERROR.UNKNOWN_ERR,
      data: null,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<string | METAFORM_ERROR> {
    if (this._required(email) && this._required(password)) {
      return METAFORM_ERROR.REQ_PARAM_IS_MISSING;
    }

    const sessionExpression = new RegExp(/PHPSESSID=\w*/gm);

    try {
      // Send user credentials
      const response = await this._fetch(this._loginUrl, {
        timeout: DEFAULT_FETCH_TIMEOUT,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: this._encodeUserCredentials(email, password),
      });

      // Catch cookies
      const setCookiesHeader = response.headers.get("set-cookie");

      //
      if (!setCookiesHeader) {
        const body = await response.json();
        const MODULE_ERR =
          body.key === "invalidUser"
            ? METAFORM_ERROR.INVALID_USR
            : METAFORM_ERROR.WRONG_PASSWORD;
        return MODULE_ERR;
      }

      const sessionId = setCookiesHeader.match(sessionExpression);

      if (!sessionId) return METAFORM_ERROR.UNKNOWN_ERR;

      return sessionId[0].split("=")[1];
    } catch (e) {
      console.log(e);
      return METAFORM_ERROR.UNKNOWN_ERR;
    }
  }

  async getTitleFranchises(
    params: Params.GetTitleFranchisesParams
  ): Promise<Responses.GetTitleFranshisesResponse> {
    if (this._required(params.id)) {
      return {
        data: null,
        error: METAFORM_ERROR.REQ_PARAM_IS_MISSING,
      };
    }

    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_FRANCHISES)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.TitleFranchises>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTorrentSeedStats(
    params?: Params.GetTorrentsSeedStatsParams
  ): Promise<Responses.GetTorrentSeedStatsResponse> {
    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TORRENT_SEED_STATS)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.TorrentSeedStats[]>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getYoutube(
    params?: Params.GetYoutubeParams
  ): Promise<Responses.GetYoutubeResponse> {
    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_YOUTUBE)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.Youtube[]>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitleSearch(
    params: Params.GetTitleSearchParams
  ): Promise<Responses.GetTitleSearchResponse> {
    if (this._required(params.search)) {
      return {
        data: null,
        error: METAFORM_ERROR.REQ_PARAM_IS_MISSING,
      };
    }

    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_SEARCH)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.TitleSearch>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitleSchedule(
    params?: Params.GetTitleScheduleParams
  ): Promise<Responses.GetTitleScheduleResponse> {
    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_SCHEDULE)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.TitleSchedule>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getFranchiseList(
    params: Params.FranshiseListParams
  ): Promise<Responses.GetFranshiseListResponse> {
    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_FRANCHISE_LIST)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.FranshiseList>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitleUpdates(
    params?: Params.GetTitleChangesAndUpdatesParams
  ): Promise<Responses.GetTitleChangesAndUpdatesResponse> {
    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_UPDATES)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.TitleChanges>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitleChanges(
    params?: Params.GetTitleChangesAndUpdatesParams
  ): Promise<Responses.GetTitleChangesAndUpdatesResponse> {
    const queryStr = params ? this._getQuery(params) : "";
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_CHANGES)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.TitleChanges>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitle(
    params: Params.GetTitleParams
  ): Promise<Responses.GetTitleResponse> {
    /*  */
    if (this._required(params.id) && this._required(params.code)) {
      return {
        data: null,
        error: METAFORM_ERROR.REQ_PARAM_IS_MISSING,
      };
    }

    const queryStr = this._getQuery(params);
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.Title>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitleRandom(
    params?: Params.GetTitleRandomParams
  ): Promise<Responses.GetTitleResponse> {
    const queryStr = params ? this._getQuery(params) : "";

    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_RANDOM)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.Title>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTitleList(
    params: Params.GetTitleListParams
  ): Promise<Responses.GetTitleListResponse> {
    if (this._required(params.id_list) && this._required(params.code_list)) {
      return {
        data: null,
        error: METAFORM_ERROR.REQ_PARAM_IS_MISSING,
      };
    }

    const queryStr = this._getQuery(params);
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TITLE_LIST)
      .setQueryString(queryStr)
      .construct();

    try {
      const data = await this._requestData<Objects.Title[]>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getYears(): Promise<Responses.GetYearsResponse> {
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_YEARS)
      .construct();

    try {
      const data = await this._requestData<number[]>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getGenres(): Promise<Responses.GetGenresResponse> {
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_GENRES)
      .construct();

    try {
      const data = await this._requestData<string[]>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }

  async getTeam(): Promise<Responses.GetTeamResponse> {
    const reqUrl = this._urlConst
      .setApiMethod(API_METHOD_PATH.GET_TEAM)
      .construct();

    try {
      const data = await this._requestData<Objects.TitleTeam>(reqUrl);
      return {
        error: null,
        data,
      };
    } catch (error: unknown) {
      return this._getError(error);
    }
  }
}
