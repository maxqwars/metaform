// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable class-methods-use-this */

import API_ENDPOINTS from '../constants/API_ENDPOINTS';
import API_VERSION from '../constants/API_VERSION';

/**
 * Class for creating urls for API requests
 *
 * @export
 * @class UrlBuilder
 */
export default class RequestURLBuilder {
  private readonly useHttps: boolean;
  private readonly apiVersion: API_VERSION;
  private endpoint: API_ENDPOINTS;
  private queryParams: string;
  private baseUrl: string;

  /**
   * Creates an instance of UrlBuilder.
   * @param {string} baseUrl REST API service url (api version required! example: api.service.com/v2 || api.service.com/v2/)
   * @param {boolean} [useHttps=true] Use security transfer protocol
   * @memberof UrlBuilder
   */
  constructor(baseUrl: string, version: API_VERSION, useHttps = true) {
    this.apiVersion = version;
    this.useHttps = useHttps;
    this.endpoint = API_ENDPOINTS.NONE;
    this.queryParams = '';
    this.baseUrl = this.assignBaseUrl(baseUrl);
  }

  set setBaseUrl(url: string) {
    // TODO: Add url validation / checking
    this.baseUrl = url;
  }

  /**
   * Add '/' to string end
   *
   * - api.service.com/v2 --> api.service.com/v2/
   * - api.service.com/v2/ --> api.service.com/v2/
   *
   * @private
   * @param {string} url
   * @return {*}  {string}
   * @memberof UrlBuilder
   */
  private assignBaseUrl(url: string): string {
    return url[url.length - 1] !== '/'
      ? `${url}/${this.apiVersion}/`
      : `${url}/${this.apiVersion}`;
  }

  /**
   * Checking for an empty string
   *
   * @private
   * @param {string} str
   * @return {*}  {boolean}
   * @memberof UrlBuilder
   */
  private isEmptyString(str: string): boolean {
    return !!str || str.length === 0;
  }

  /**
   * Set using API endpoint
   *
   * @param {ENDPOINT_ENUM} endpoint
   * @return {*}  {UrlBuilder}
   * @memberof UrlBuilder
   */
  public setEndpoint(endpoint: API_ENDPOINTS): RequestURLBuilder {
    this.endpoint = endpoint;
    return this;
  }

  /**
   * Add query params to request
   *
   * @param {string} query
   * @return {*}  {UrlBuilder}
   * @memberof UrlBuilder
   */
  public setQueryParams(query: string): RequestURLBuilder {
    this.queryParams = query;
    return this;
  }

  /**
   * Build API request url
   *
   * @return {*}  {(string | never)}
   * @memberof UrlBuilder
   */
  public build(): string | never {
    if (this.endpoint === API_ENDPOINTS.NONE) {
      throw Error(
        'Failed build request url, set used api endpoint before build'
      );
    }

    let url = '';
    url += this.useHttps ? 'https://' : 'http://';
    url += this.baseUrl;
    url += this.endpoint;
    url += this.isEmptyString(this.queryParams) ? `?${this.queryParams}` : '';

    return url;
  }
}
