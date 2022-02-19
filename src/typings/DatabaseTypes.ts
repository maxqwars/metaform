// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IFormatQueryParams, ISelectQueryParams } from './SharedTypes';

import TITLE_CONTENT_TYPE from '../enums/TITLE_CONTENT_TYPE';
import TITLE_SEASON from '../enums/TITLE_SEASON';
import TITLE_STATUS from '../enums/TITLE_STATUS';
import { WEEK_DAY } from '..';

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
export interface INames {
  alternative: string | null;
  en: string | null;
  ru: string | null;
}

export interface IStatus {
  code: TITLE_STATUS | null;
  string: string | null;
}

export interface IPoster {
  rawBase64File: string | null;
  url: string | null;
}

export interface IPosters {
  small: IPoster | null;
  medium: IPoster | null;
  original: IPoster | null;
}

export interface IType {
  code: TITLE_CONTENT_TYPE | null;
  fullString: string | null;
  length: string | null;
  series: number | null;
  string: string | null;
}

export interface ITeam {
  decor: string[] | null;
  editing: string[] | null;
  timing: string[] | null;
  translator: string[] | null;
  voice: string[] | null;
}

export interface ISeason {
  code: TITLE_SEASON | null;
  string: string | null;
  weekDay: WEEK_DAY | null;
  year: number | null;
}

export interface IBlocked {
  bakanim: boolean | null;
  blocked: boolean | null;
}

export interface ISeries {
  first: number | null;
  last: number | null;
  string: string | null;
}

export interface IObjectPlaylist {
  [key: number]: {
    id: number;
    createdTimestamp: number;
    hls: {
      fhd: string | null;
      hd: string | null;
      sd: string | null;
    } | null;
  };
}

export interface IPlayer {
  alternativePlayer: string | null;
  host: string | null;
  playlist: IObjectPlaylist | null;
  series: ISeries | null;
}

export interface ITorrentQuality {
  encoder: string | null;
  lq_audio: boolean | null;
  resolution: number | null;
  string: string | null;
  type: string | null;
}

export interface ITorrent {
  quality: ITorrentQuality;
  downloads: number | number;
  leechers: number | number;
  metadata: null;
  raw_base64_file: string | null;
  seeders: number | number;
  series: ISeries | null;
  torrentId: number | null;
  totalSize: number | number;
  uploadedTimestamp: number | null;
  url: string | null;
}

export interface ITorrents {
  list: ITorrent[] | null;
  series: ISeries | null;
}

export interface ITitle {
  announce: string | null;
  code: string | null;
  description: string | null;
  genres: string[] | null;
  id: number | null;
  inFavorites: number | null;
  lastChange: number | null;
  updated: number | null;
  blocked: IBlocked | null;
  names: INames | null;
  player: IPlayer | null;
  posters: IPosters | null;
  season: ISeason | null;
  status: IStatus | null;
  team: ITeam | null;
  torrents: ITorrents | null;
  type: IType | null;
}
