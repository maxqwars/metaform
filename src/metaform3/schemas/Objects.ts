export type Title = {
  id?: number;
  code?: string;
  names?: TitleNames;
  franchises?: TitleFranchises[];
  announce?: string;
  status?: TitleStatus;
  posters?: TitlePosters;
  updated?: number;
  last_change?: number;
  type?: TitleType;
  genres?: string;
  team?: TitleTeam;
  season?: TitleSeason;
  description?: string;
  in_favorites?: number;
  blocked?: TitleBlocked;
  player?: TitlePlayer;
  torrents?: TitleTorrents;
};

export type TitleTorrents = {
  episodes?: TitlePlayerEpisodes;
  list?: TitleTorrentsListItem[];
};

export type TitleTorrentsListItem = {
  torrent_id?: number;
  leechers?: number;
  seeders?: number;
  downloads?: number;
  total_size?: number;
  size_string?: string;
  url?: string;
  magnet?: string;
  uploaded_timestamp?: number;
  hash?: string;
  metadata?: null;
  raw_base64_file?: null;
  episodes?: TitlePlayerEpisodes;
  quality?: TitleTorrentsListItemQuality;
};

export type TitleTorrentsListItemQuality = {
  string?: string;
  type?: string;
  resolution?: string;
  encoder?: string;
  lq_audio?: null;
};

export type TitlePlayer = {
  alternative_player?: string | null;
  host?: string;
  episodes?: TitlePlayerEpisodes;
  list?: TitlePlayerList;
  rutube?: unknown;
};

export type TitlePlayerList = {
  [key: string]: TitlePlayerListItem;
};

export type TitlePlayerListItem = {
  episode?: number;
  name?: null | string;
  uuid?: string;
  created_timestamp?: number;
  preview?: null | string;
  skips?: TitlePlayerListItemSkips;
  hls?: TitlePlayerListItemHLS;
};

export type TitlePlayerListItemHLS = {
  fhd?: string;
  hd?: string;
  sd?: string;
};

export type TitlePlayerListItemSkips = {
  opening?: string;
  ending?: string;
};

export type TitlePlayerEpisodes = {
  first?: number;
  last?: number;
  string?: string;
};

export type TitleBlocked = {
  blocked?: boolean;
  bakanim?: boolean;
};

export type TitleSeason = {
  string?: string;
  code?: number;
  year?: number;
  week_day?: number;
};

export type TitleTeam = {
  voice?: string[];
  translator?: string[];
  editing?: string[];
  decor?: string[];
  timing?: string[];
};

export type TitleType = {
  full_string?: string;
  code?: number;
  string?: string;
  episodes?: null;
  length?: number;
};

export type TitlePosters = {
  small?: TitlePostersPoster;
  medium?: TitlePostersPoster;
  original?: TitlePostersPoster;
};

export type TitlePostersPoster = {
  url?: string;
  raw_base64_file?: string | null;
};

export type TitleStatus = {
  string?: string;
  code?: number;
};

export type TitleNames = {
  ru?: string;
  en?: string;
  alternative?: string;
};

export type TitleFranchises = {
  franchise?: TitleFranchisesFranchise;
  releases?: TitleFranchisesRelease[];
};

export type TitleFranchisesFranchise = {
  id?: string;
  name?: string;
};

export type TitleFranchisesRelease = {
  id?: number;
  code?: string;
  ordinal?: number;
  names?: TitleNames;
};

export type descriptionType = "html" | "plain";

export type playlistType = "object" | "array";

export type includeType = "raw_poster" | "raw_torrent" | "torrent_meta";

export type TitleChanges = {
  list?: Title[];
  pagination?: Pagination;
};

export type Pagination = {
  page?: number;
  current_page?: number;
  items_per_page?: number;
  total_items?: number;
};

export type FranshiseList = {
  list?: FranshiseListItem[];
  pagination?: Pagination;
};

export type FranshiseListItem = {
  franshise?: FranshiseListItemFranshise;
  releases?: Title[];
};

export type FranshiseListItemFranshise = {
  id?: string;
  name?: string;
};

export type TitleSearch = Title[];

export type TitleSchedule = {
  day?: number;
  list?: Title[];
};

export type Youtube = {
  id?: number;
  title?: string;
  preview?: YoutubePreview;
  youtube_id?: string;
  comments?: number;
  views?: number;
  timestamp?: number;
};

export type YoutubePreview = {
  src?: string;
  thumbnail?: string;
};

export type TorrentSeedStats = {
  downloaded?: number;
  uploaded?: number;
  user?: string;
};

export type Feed = {
  youtube?: Youtube[];
  title?: Title[];
};
