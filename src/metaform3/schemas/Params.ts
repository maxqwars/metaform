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
