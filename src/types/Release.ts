import { RELEASE_STATUS, RELEASE_SEASON, CONTENT_FORMAT } from "../enums";

export type ReleaseNames = {
  ru?: string;
  en?: string;
  alternative?: string | null;
};

export type ReleaseStatus = {
  string?: string;
  code?: RELEASE_STATUS;
};

export type ReleasePoster = {
  url?: string;
  rawBase64File?: string | null;
};

export type ReleaseType = {
  fullString?: string;
  code?: CONTENT_FORMAT;
  string?: string;
  series?: number;
  length?: number;
};

export type ReleaseSeason = {
  string?: string;
  code?: RELEASE_SEASON;
  year?: number;
  weekDay?: number;
};

export type ReleaseBlocked = {
  blocked?: boolean;
  bakanim?: boolean;
};

export type ReleasePlayer = {
  alternativePlayer?: string | null;
  host?: string;
  series?: {
    first?: number;
    last?: number;
    string?: string;
  };
  playlist?: ObjectPlaylist;
  rutubePlaylist: RutubePlaylist;
};

export type ObjectPlaylist = {
  [key: string]: {
    serie?: number;
    createdTimestamp?: number;
    preview?: string;
    skips?: {
      opening?: string[];
      ending?: string[];
    };
    hls?: {
      sd?: string;
      hd?: string;
      fhd?: string;
    };
  };
};

export type RutubePlaylist = {
  [key: string]: {
    serie?: number;
    createdTimestamp?: number;
    rutube_id?: string;
  };
};

export type TorrentFile = {
  file?: string;
  size?: number;
  offset?: number;
};

export type TorrentMeta = {
  hash?: string;
  name?: string;
  announce?: string[];
  createdTimestamp?: number;
  filesList?: TorrentFile[];
};

export type TorrentInfo = {
  torrentId?: number;
  series?: { first?: number; last?: number; string?: string };
  quality?: {
    string?: string;
    type?: string;
    resolution?: string;
    encoder?: string;
    lq_audio?: null;
  };
  leechers?: number;
  seeders?: number;
  downloads?: number;
  total_size?: number;
  url?: string;
  uploadedTimestamp?: number;
  hash?: string;
  metadata?: null | TorrentMeta;
  rawBase64File?: null | string;
};

export type ReleaseTorrents = {
  series?: {
    first?: number;
    last?: number;
    string?: string;
  };
  list?: TorrentInfo[];
};

export type Release = {
  id?: number;
  code?: string;
  names?: ReleaseNames;
  announce?: string;
  status?: ReleaseStatus;
  posters?: {
    small?: ReleasePoster;
    medium?: ReleasePoster;
    original?: ReleasePoster;
  };
  updated?: number;
  lastChange?: number;
  type?: ReleaseType;
  genres?: string[];
  team?: {
    voice?: string[];
    translator?: string[];
    editing?: string[];
    decor?: string[];
    timing?: string[];
  };
  season?: ReleaseSeason;
  description?: string;
  inFavorites?: number;
  blocked?: ReleaseBlocked;
  player?: ReleasePlayer;
  torrents?: ReleaseTorrents;
};
