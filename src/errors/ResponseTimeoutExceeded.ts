// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const RESPONSE_TIMEOUT_EXCEEDED = 'RESPONSE_TIMEOUT_EXCEEDED';

export class ResponseTimeoutExceeded extends Error {
  public name = RESPONSE_TIMEOUT_EXCEEDED;

  constructor() {
    super(`RESPONSE_TIMEOUT_EXCEEDED`);
  }
}
