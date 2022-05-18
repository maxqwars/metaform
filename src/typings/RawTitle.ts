// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type RawTitle = {
  id?: number;
  code?: string;
  announce?: string | null;
  updated?: number;
  last_change?: number;
  genres?: string[];
  description?: string;
  in_favorites?: number;

  /* names */
  names?: {
    ru?: string;
    en?: string;
    alternative?: string | null;
  };

  /* status */
  status?: {
    string?: string | null;
    code?: number;
  };

  /* poster */
  posters?: {
    small?: {
      url?: string;
      raw_base64_file?: string | null;
    };
    medium?: {
      url?: string;
      raw_base64_file?: string | null;
    };
    original?: {
      url?: string;
      raw_base64_file?: string | null;
    };
  };

  /* type */
  type?: {
    full_string?: string;
    code?: number;
    string?: string;
    series?: number;
    length?: number;
  };

  /* team */
  team?: {
    voice?: string[];
    translator?: string[];
    editing?: string[];
    decor?: string[];
    timing?: string[];
  };

  /* season */
  season?: {
    string?: string;
    code?: number;
    year?: number;
    week_day?: number;
  };

  /* blocked */
  blocked?: {
    blocked?: boolean;
    bakanim?: boolean;
  };

  /* player */
  player?: {
    alternative_player?: string;
    host?: string;
    series?: {
      first?: number;
      last?: number;
      string?: string;
    };
    playlist?: null | {
      [key: number]: {
        serie?: number;
        created_timestamp?: number;
        preview?: null;
        skips?: {
          opening?: [];
          ending?: [];
        };
        hls?: {
          fhd?: string;
          hd?: string;
          sd?: string;
        };
      };
    };
  };
  // TODO: Add torrents
};
