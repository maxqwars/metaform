// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * Base class for create modules
 *
 * @export
 * @class CoreModule
 */
export default class CoreModule {
  // eslint-disable-next-line class-methods-use-this
  async fetchWithTimeout(url: string, timeout: number, options = {}) {
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
