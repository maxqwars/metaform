// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* -------------------------------------------------------------------------- */
/*                                Core classes                                */
/* -------------------------------------------------------------------------- */
export { default as UrlBuilder } from './core/UrlBuilder';
export { default as CoreQueryParamsBuilder } from './core/CoreQueryParamsBuilder';

/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
export { default as UrlTools } from './utils/UrlTools';

/* -------------------------------------------------------------------------- */
/*                                    Enums                                   */
/* -------------------------------------------------------------------------- */
export { default as API_ENDPOINTS } from './enums/API_ENDPOINTS';
export { default as DESCRIPTION_TYPE } from './enums/DESCRIPTION_TYPE';
export { default as INCLUDED_RESOURCES } from './enums/INCLUDED_RESOURCES';
export { default as PLAYLIST_TYPE } from './enums/PLAYLIST_TYPE';
export { default as TITLE_CONTENT_TYPE } from './enums/TITLE_CONTENT_TYPE';
export { default as TITLE_SEASON } from './enums/TITLE_SEASON';
export { default as WEEK_DAY } from './enums/WEEK_DAY';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export {
  ISelectQueryParams,
  IFormatQueryParams,
  IShiftQueryParams,
} from './typings/SharedTypes';

export {
  IGetTitleQueryParams,
  IGetTitlesQueryParams,
  INames,
  IStatus,
  IPoster,
  IPosters,
  ITeam,
  IType,
  ISeason,
  IBlocked,
  ISeries,
  IObjectPlaylist,
  IPlayer,
  ITorrentQuality,
  ITorrent,
  ITorrents,
  ITitle,
} from './typings/DatabaseTypes';
