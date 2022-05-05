// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class APIError extends Error {
  public name = 'API_ERROR';

  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
  }
}
