// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class QueryBuilderBase {
  private _params: { [key: string]: unknown } = {};

  protected get params(): { [key: string]: unknown } {
    return this._params;
  }

  protected set params(value: { [key: string]: unknown }) {
    this._params = value;
  }

  protected addParam(key: string, value: unknown): void {
    this._params[key] = value;
  }

  protected build(): string {
    return Object.keys(this.params)
      .map(key => `${key}=${this.params[key]}`)
      .join('&');
  }

  protected isArray(arr: any): boolean {
    if (Array.isArray(arr)) {
      const obj = arr as Object;
      return Array.isArray(arr) && obj.hasOwnProperty('length');
    }
    return false;
  }

  protected isString(str: any): boolean {
    return typeof str === 'string' || str instanceof String;
  }

  // eslint-disable-next-line no-unused-vars
  protected isObj(obj: any): boolean {
    return false;
  }

  protected isNumber(num: any): boolean {
    return Number.isInteger(num) || Number.isFinite(num);
  }

  // eslint-disable-next-line no-unused-vars
  protected isBool(bool: any): boolean {
    return false;
  }
}
