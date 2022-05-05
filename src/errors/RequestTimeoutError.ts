// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class RequestTimeoutError extends Error {
  public name = 'APIRequestTimeout';

  constructor(timeout: number) {
    super(`API response timeout exceeded. limit: ${timeout}`);
  }
}
