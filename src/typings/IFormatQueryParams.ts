// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import DESCRIPTION_TYPE from '../constants/DESCRIPTION_TYPE';
import PLAYLIST_TYPE from '../constants/PLAYLIST_TYPE';

export interface IFormatQueryParams {
  descriptionType?: DESCRIPTION_TYPE;
  playlistType?: PLAYLIST_TYPE;
}
