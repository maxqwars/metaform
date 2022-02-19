// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * Core class for create query params builders
 *
 * @export
 * @class CoreQueryParamsBuilder
 */
export default class CoreQueryParamsBuilder {
  protected params: { [key: string]: unknown } = {};

  /**
   * Add new parameter to query
   *
   * @protected
   * @param {string} key
   * @param {unknown} value
   * @memberof CoreQueryParamsBuilder
   */
  protected addParameter(key: string, value: unknown): void {
    this.params[key] = value;
  }

  /**
   * Build query params string
   *
   * @return {*}  {string}
   * @memberof CoreQueryParamsBuilder
   */
  public build(): string {
    return Object.keys(this.params)
      .map(key => `${key}=${this.params[key]}`)
      .join('&');
  }
}
