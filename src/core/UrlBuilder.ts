import { API_METHOD, API_VER } from "../enums";

/**
 * Class for building API requests URL`s
 *
 * @export
 * @class UrlBuilder
 */
export class UrlBuilder {
  private _https: boolean;
  private _apiVersion: API_VER;
  private _method: API_METHOD;
  private _query: string;
  private _host: string;

  /**
   * Creates an instance of UrlBuilder.
   * @param {string} host Used API host
   * @param {API_VER} version Used API version
   * @param {boolean} [https=true] Use secure connection
   * @memberof UrlBuilder
   */
  constructor(host: string, version: API_VER, https = true) {
    this._https = https;
    this._apiVersion = version;
    this._method = API_METHOD.GET_TITLE;
    this._query = "";
    this._host = this._setHost(host);
  }

  /**
   * Set `https` flag
   *
   * @memberof UrlBuilder
   */
  set https(flag: boolean) {
    this._https = flag;
  }

  /**
   * Set used API version
   *
   * @memberof UrlBuilder
   */
  set apiVersion(version: API_VER) {
    this._apiVersion = version;
  }

  /**
   * Set used API method
   *
   * @memberof UrlBuilder
   */
  set method(method: API_METHOD) {
    this._method = method;
  }

  /**
   * Set API host
   *
   * @memberof UrlBuilder
   */
  set host(host: string) {
    this._host = this._setHost(host);
  }

  /**
   * Get used API host
   *
   * @type {string}
   * @memberof UrlBuilder
   */
  get host(): string {
    return this._host;
  }

  private _isEmptyString(str: string): boolean {
    return !!str || str.length === 0;
  }

  private _setHost(url: string): string {
    return url[url.length - 1] !== "/"
      ? `${url}/${this._apiVersion}/`
      : `${url}/${this._apiVersion}`;
  }

  /**
   * Set used API method
   *
   * @param {API_METHOD} method
   * @return {*}  {UrlBuilder}
   * @memberof UrlBuilder
   */
  public useMethod(method: API_METHOD): UrlBuilder {
    this._method = method;
    return this;
  }

  /**
   * Use query string
   *
   * @param {string} query query string
   * @return {*}  {UrlBuilder}
   * @memberof UrlBuilder
   */
  public useQuery(query: string): UrlBuilder {
    this._query = query;
    return this;
  }

  /**
   * Build final request URL
   *
   * @return {*}  {string}
   * @memberof UrlBuilder
   */
  public build(): string {
    let url = "";
    url += this._https ? "https://" : "http://";
    url += this._host;
    url += this._method;
    url += this._isEmptyString(this._query) ? "" : `?${this._query}`;

    return url;
  }
}
