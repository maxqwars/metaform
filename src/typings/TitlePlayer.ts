// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ObjectPlaylist } from './ObjectPlaylist';
import { TitleSeries } from './TitleSeries';

export type TitlePlayer = {
  alternativePlayer: string | null;
  host: string | null;
  playlist: ObjectPlaylist | null;
  series: TitleSeries | null;
};
