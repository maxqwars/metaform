// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ISelectQueryParams } from './ISelectQueryParams';
import { IFormatQueryParams } from './IFormatQueryParams';

export interface IGetTitlesQueryParams
  extends ISelectQueryParams,
    IFormatQueryParams {
  codeLIst?: string[];
  idList?: number[];
}
