export type TitleParams = {
  id: number;
  code: string;
  torrent_id: number;
  filter: string[];
  remove: string[];
  include: string[];
  description_type: string;
  playlist_type: string;
};

export type Poster = {
  url?: string;
  raw_base64_file?: string | null;
};

export type PlayerEpisode = {
  episode?: number;
  created_timestamp?: number;
  preview?: null | string;
  skips?: {
    // TODO: Add skips types
  };
  hls?: {
    fhd?: string;
    hd?: string;
    sd?: string;
  };
};

export type TitleResponse = {
  id?: number;
  code?: string;
  name?: {
    ru?: string;
    en?: string;
    alternative?: string | null;
  };
  announce?: string;
  status?: {
    string?: string;
    code?: number;
  };
  posters?: {
    small?: Poster;
    medium?: Poster;
    original?: Poster;
  };
  updated?: number;
  last_change?: number;
  type?: {
    full_string?: string;
    code?: number;
    string?: string;
    episodes?: number | null;
    length?: number;
  };
  genres?: string[];
  team?: {
    voice?: string[];
    translator?: string[];
    editing?: string[];
    decor?: string[];
    timing?: string[];
  };
  season?: {
    string?: string;
    code?: number;
    year?: number;
    week_day?: number;
  };
  description?: string;
  in_favorites?: number;
  blocked?: {
    blocked?: boolean;
    bakanim?: boolean;
  };
  player?: {
    alternative_player?: string | null;
    host?: string;
    episodes?: {
      first?: number;
      last?: number;
      string?: string;
    };
    list?: PlayerEpisode[];
    rutube?: {
      // TODO: Add RuTube type
    };
    // TODO: Add torrents prop type
    torrents?: null;
  };
};
