// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import RequestUrlBuilder from '../core/RequestURLBuilder';
import { ModuleOptions } from '../typings';

/**
 * Base class for create modules
 *
 * @export
 * @class CoreModule
 */
export default class CoreModule {
  protected requestURLBuilder: RequestUrlBuilder;

  protected options: ModuleOptions;

  constructor(options: ModuleOptions) {
    this.requestURLBuilder = new RequestUrlBuilder(
      options.baseUrl,
      options.version,
      options.useHttps
    );
    this.options = options;
  }

  // eslint-disable-next-line class-methods-use-this
  protected async fetchWithTimeout(url: string, timeout: number, options = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }
}
