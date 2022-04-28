// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class QueryBuilderBase {
  protected params: { [key: string]: unknown } = {};

  protected addParam(key: string, value: unknown): void {
    this.params[key] = value;
  }

  protected build(): string {
    return Object.keys(this.params)
      .map(key => `${key}=${this.params[key]}`)
      .join('&');
  }
}
