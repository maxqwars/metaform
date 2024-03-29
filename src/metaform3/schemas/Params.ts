/* eslint-disable @typescript-eslint/no-empty-interface */

import { playlistType, descriptionType, includeType } from "./Objects";
import { REL_SEASON, WEEK_DAY } from "../enums";

export interface TitleCommonParams {
  filter?: string[];
  remove?: string[];
  include?: includeType[];
  description_type?: descriptionType;
  playlist_type?: playlistType;
}

export interface PaginationParams {
  limit?: number;
  after?: number;
  page?: number;
  items_per_page?: number;
}

export interface GetTitleParams extends TitleCommonParams {
  id?: number;
  code?: string;
  torrent_id?: string;
}

export interface GetTitleListParams extends TitleCommonParams {
  id_list?: number[];
  code_list?: string[];
  torrent_id_list?: string[];
  page?: number;
  items_per_page?: number;
}

export interface GetTitleChangesAndUpdatesParams
  extends TitleCommonParams,
    PaginationParams {
  since?: number;
}

export interface GetTitleScheduleParams extends TitleCommonParams {
  days?: string[];
}

export interface GetTitleRandomParams extends TitleCommonParams {}

export interface GetTitleSearchParams
  extends TitleCommonParams,
    PaginationParams {
  search?: string;
  year?: number;
  type?: string[];
  season_code?: REL_SEASON[];
  genres?: string[];
  team?: string[];
  voice?: string[];
  translator?: string[];
  editing?: string[];
  decor?: string[];
  timing?: string[];
  order_by?: string;
  sort_direction?: number;
}

export interface GetTitleSearchAdvancedParams {}

export interface GetTitleFranchisesParams {
  id?: number;
  filter?: string[];
  remove?: string[];
}

export interface GetYoutubeParams extends PaginationParams {
  filter?: string;
  remove?: string;
  since?: number;
}

export interface GetFeedParams extends TitleCommonParams, PaginationParams {}

export interface GetTorrentsSeedStatsParams extends PaginationParams {
  users?: string[];
  filter?: string[];
  remove?: string;
  sort_by?: string;
  order?: number;
}

export interface GetTorrentRSSParams {}

export interface GetUserParams {}

export interface GetUserFavoritesParams {}

export interface PutUserFavoritesParams {}

export interface DeleteFavoritesParams {}

export interface FranshiseListParams extends PaginationParams {
  filter?: string[];
  remove?: string[];
}

export interface TitleSchedule extends TitleCommonParams {
  days?: WEEK_DAY[];
}
