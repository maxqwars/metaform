// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import API_VERSION from '../constants/API_VERSION';

export type ModuleOptions = {
  baseUrl: string;
  version: API_VERSION;
  useHttps: boolean;
  timeout: number;
};
