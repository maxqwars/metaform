// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* Core */
export { default as RequestURLBuilder } from './core/RequestURLBuilder';
export { default as QueryBuilderBase } from './core/QueryBuilderBase';

/* Utils */
export { default as UrlTools } from './utils/UrlTools';

/* Enums */
export { default as API_ENDPOINTS } from './enums/API_ENDPOINTS';
export { default as DESCRIPTION_TYPE } from './enums/DESCRIPTION_TYPE';
export { default as INCLUDED_RESOURCES } from './enums/INCLUDED_RESOURCES';
export { default as PLAYLIST_TYPE } from './enums/PLAYLIST_TYPE';
export { default as TITLE_CONTENT_TYPE } from './enums/TITLE_CONTENT_TYPE';
export { default as TITLE_SEASON } from './enums/TITLE_SEASON';
export { default as WEEK_DAY } from './enums/WEEK_DAY';
export { default as API_VERSION } from './enums/API_VERSION';
export { default as API_ERROR } from './enums/API_ERROR';

/* Classes */
export { default as GetTitleQueryBuilder } from './classes/GetTitleQueryBuilder';

/* Shared types */
export {
  ISelectQueryParams,
  IFormatQueryParams,
  IShiftQueryParams,
} from './typings/SharedTypes';

/* Database module types */
export {
  IGetTitleQueryParams,
  IGetTitlesQueryParams,
  TitleNames,
  TitleStatus,
  Poster,
  TitlePosters,
  TitleTeam,
  TitleType,
  TitleSeason,
  TitleBlocked,
  TitleSeries,
  ObjectPlaylist,
  TitlePlayer,
  TorrentQuality,
  Torrent,
  TitleTorrents,
  Title,
} from './typings/DatabaseTypes';

/* Modules */
export { default as Database } from './modules/Database';
