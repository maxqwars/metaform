/* eslint-disable @typescript-eslint/no-empty-interface */

import { playlistType, descriptionType, includeType } from "./Objects";

export interface TitleCommonParams {
  filter?: string[];
  remove?: string[];
  include?: includeType[];
  description_type?: descriptionType;
  playlist_type?: playlistType;
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

// TODO: Remove, use GetTitleChangesParams
export interface GetTitleUpdatesParams extends TitleCommonParams {
  limit?: number;
  since?: number;
  after?: number;
  page?: number;
  items_per_page?: number;
}

export interface GetTitleChangesParams extends TitleCommonParams {
  limit?: number;
  since?: number;
  after?: number;
  page?: number;
  items_per_page?: number;
}

export interface GetTitleScheduleParams extends TitleCommonParams {
  days?: string[];
}

export interface GetTitleRandomParams extends TitleCommonParams {}

export interface GetTitleSearchParams {}

export interface GetTitleSearchAdvancedParams {}

export interface GetTitleFranchisesParams {}

export interface GetYoutubeParams {}

export interface GetFeedParams {}

export interface GetTorrentsSeedStatsParams {}

export interface GetTorrentRSSParams {}

export interface GetUserParams {}

export interface GetUserFavoritesParams {}

export interface PutUserFavoritesParams {}

export interface DeleteFavoritesParams {}
