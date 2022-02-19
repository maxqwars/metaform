// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable class-methods-use-this */

import API_ENDPOINTS from '../enums/API_ENDPOINTS';

/**
 * Class for creating urls for API requests
 *
 * @export
 * @class UrlBuilder
 */
export default class UrlBuilder {
  private readonly baseUrl: string;

  private readonly useHttps: boolean;

  private endpoint: API_ENDPOINTS;

  private queryParams: string;

  /**
   * Creates an instance of UrlBuilder.
   * @param {string} baseUrl REST API service url (api version required! example: api.service.com/v2 || api.service.com/v2/)
   * @param {boolean} [useHttps=true] Use security transfer protocol
   * @memberof UrlBuilder
   */
  constructor(baseUrl: string, useHttps = true) {
    this.baseUrl = this.assignBaseUrl(baseUrl);
    this.useHttps = useHttps;
    this.endpoint = API_ENDPOINTS.NONE;
    this.queryParams = '';
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
    return url[url.length - 1] !== '/' ? `${url}/` : url;
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
  public setEndpoint(endpoint: API_ENDPOINTS): UrlBuilder {
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
  public setQueryParams(query: string): UrlBuilder {
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
    url += !this.isEmptyString(this.queryParams) ? `?${this.queryParams}` : '';

    return url;
  }
}
