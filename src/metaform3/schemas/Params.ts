/* eslint-disable @typescript-eslint/no-empty-interface */

export interface GetTitleParams {
  id?: number;
  code?: string;
  torrent_id?: string;
  filter?: string[];
  remove?: string[];
  include?: string[];
  description_type?: string;
  playlist_type?: string;
}

export interface GetTitleListParams {
  id_list?: number[];
  code_list?: string[];
  torrent_id_list?: string[];
  filter?: string[];
  remove?: string[];
  include?: string;
  description_type?: string;
  playlist_type?: string;
  page?: number;
  items_per_page?: number;
}

export interface GetTitleUpdatesParams {}

export interface GetTitleChangesParams {}

export interface GetTitleScheduleParams {}

export interface GetTitleRandomParams {}

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
