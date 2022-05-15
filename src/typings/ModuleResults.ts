// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { APIError } from './APIError';

export type ModuleResults<T> = {
  error: boolean;
  content?: T;
  errorDetails?: APIError;
};
