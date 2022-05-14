// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TITLE_SEASON from '../constants/TITLE_SEASON';
import { ISelectQueryParams } from './ISelectQueryParams';
import { IShiftQueryParams } from './IShiftQueryParams';
import { IFormatQueryParams } from './IFormatQueryParams';

export interface ISearchTitlesQueryParams
  extends ISelectQueryParams,
    IShiftQueryParams,
    IFormatQueryParams {
  search: string;
  year: number;
  seasonCode: TITLE_SEASON;
  genres: string[];
  voice: string[];
  translator: string[];
  editing: string[];
  decor: string[];
  timing: string[];
}
