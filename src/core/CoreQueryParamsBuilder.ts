// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class CoreQueryParamsBuilder {
  protected params: { [key: string]: unknown } = {};

  protected addParameter(key: string, value: unknown): void {
    this.params[key] = value;
  }

  public build(): string {
    return Object.keys(this.params)
      .map(key => key + '=' + this.params[key])
      .join('&');
  }
}
