// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import DESCRIPTION_TYPE from '../enums/DESCRIPTION_TYPE';
import INCLUDED_RESOURCES from '../enums/INCLUDED_RESOURCES';
import PLAYLIST_TYPE from '../enums/PLAYLIST_TYPE';

export interface ISelectQueryParams {
  filter?: string[];
  include?: INCLUDED_RESOURCES[];
  remove?: string[];
}

export interface IFormatQueryParams {
  descriptionType?: DESCRIPTION_TYPE;
  playlistType?: PLAYLIST_TYPE;
}

export interface IShiftQueryParams {
  limit?: number;
  since?: number;
  after?: number;
}
