// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TitleNames } from './TitleNames';
import { TitleStatus } from './TitleStatus';
import { TitlePosters } from './TitlePosters';
import { TitleType } from './TitleType';
import { TitleTeam } from './TitleTeam';
import { TitleSeason } from './TitleSeason';
import { TitleBlocked } from './TitleBlocked';
import { TitlePlayer } from './TitlePlayer';
import { TitleTorrents } from './TitleTorrents';

export type Title = {
  announce?: string | null;
  code?: string | null;
  description?: string | null;
  genres?: string[] | null;
  id?: number | null;
  inFavorites?: number | null;
  lastChange?: number | null;
  updated?: number | null;
  // ---
  blocked?: TitleBlocked | null;
  names?: TitleNames | null;
  player?: TitlePlayer | null;
  posters?: TitlePosters | null;
  season?: TitleSeason | null;
  status?: TitleStatus | null;
  team?: TitleTeam | null;
  torrents?: TitleTorrents | null;
  type?: TitleType | null;
};
