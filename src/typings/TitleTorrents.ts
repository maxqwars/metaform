// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Torrent } from './Torrent';
import { TitleSeries } from './TitleSeries';

export type TitleTorrents = {
  list: Torrent[] | null;
  series: TitleSeries | null;
};
