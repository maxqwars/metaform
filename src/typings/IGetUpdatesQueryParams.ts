// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IShiftQueryParams } from './IShiftQueryParams';
import { IFormatQueryParams } from './IFormatQueryParams';
import { ISelectQueryParams } from './ISelectQueryParams';

export interface IGetUpdatesQueryParams
  extends IFormatQueryParams,
    ISelectQueryParams,
    IShiftQueryParams {}
