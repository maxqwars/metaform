// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IFormatQueryParams, ISelectQueryParams } from './SharedTypes';

import TITLE_CONTENT_TYPE from '../enums/TITLE_CONTENT_TYPE';
import TITLE_SEASON from '../enums/TITLE_SEASON';
import TITLE_STATUS from '../enums/TITLE_STATUS';
import WEEK_DAY from '../enums/WEEK_DAY';

/* -------------------------------------------------------------------------- */
/*                              Query parameters                              */
/* -------------------------------------------------------------------------- */
export interface IGetTitlesQueryParams
  extends ISelectQueryParams,
    IFormatQueryParams {
  codeLIst?: string[];
  idList?: number[];
}

export interface IGetTitleQueryParams
  extends ISelectQueryParams,
    IFormatQueryParams {
  code?: string;
  id?: number;
  torrentId?: number;
}

/* -------------------------------------------------------------------------- */
/*                                  Response                                  */
/* -------------------------------------------------------------------------- */
export type TitleNames = {
  alternative: string | null;
  en: string | null;
  ru: string | null;
};

export type TitleStatus = {
  code: TITLE_STATUS | null;
  string: string | null;
};

export type Poster = {
  rawBase64File: string | null;
  url: string | null;
};

export type TitlePosters = {
  small: Poster | null;
  medium: Poster | null;
  original: Poster | null;
};

export type TitleType = {
  code: TITLE_CONTENT_TYPE | null;
  fullString: string | null;
  length: string | null;
  series: number | null;
  string: string | null;
};

export type TitleTeam = {
  decor: string[] | null;
  editing: string[] | null;
  timing: string[] | null;
  translator: string[] | null;
  voice: string[] | null;
};

export type TitleSeason = {
  code: TITLE_SEASON | null;
  string: string | null;
  weekDay: WEEK_DAY | null;
  year: number | null;
};

export type TitleBlocked = {
  bakanim: boolean | null;
  blocked: boolean | null;
};

export type TitleSeries = {
  first: number | null;
  last: number | null;
  string: string | null;
};

export type ObjectPlaylist = {
  [key: number]: {
    id: number;
    createdTimestamp: number;
    hls: {
      fhd: string | null;
      hd: string | null;
      sd: string | null;
    } | null;
  };
};

export type TitlePlayer = {
  alternativePlayer: string | null;
  host: string | null;
  playlist: ObjectPlaylist | null;
  series: TitleSeries | null;
};

export type TorrentQuality = {
  encoder: string | null;
  lq_audio: boolean | null;
  resolution: number | null;
  string: string | null;
  type: string | null;
};

export type Torrent = {
  quality: TorrentQuality;
  downloads: number | number;
  leechers: number | number;
  metadata: null;
  raw_base64_file: string | null;
  seeders: number | number;
  series: TitleSeries | null;
  torrentId: number | null;
  totalSize: number | number;
  uploadedTimestamp: number | null;
  url: string | null;
};

export type TitleTorrents = {
  list: Torrent[] | null;
  series: TitleSeries | null;
};

export type Title = {
  announce: string | null;
  code: string | null;
  description: string | null;
  genres: string[] | null;
  id: number | null;
  inFavorites: number | null;
  lastChange: number | null;
  updated: number | null;
  blocked: TitleBlocked | null;
  names: TitleNames | null;
  player: TitlePlayer | null;
  posters: TitlePosters | null;
  season: TitleSeason | null;
  status: TitleStatus | null;
  team: TitleTeam | null;
  torrents: TitleTorrents | null;
  type: TitleType | null;
};
