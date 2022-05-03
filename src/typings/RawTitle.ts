// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type RawTitle = {
  id?: number;
  code?: string;
  names?: {
    ru?: string;
    en?: string;
    alternative?: string | null;
  };
  announce?: string | null;
  status?: {
    string?: string | null;
    code?: number;
  };
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
  updated?: number;
  last_change?: number;
  type?: {
    full_string?: string;
    code?: number;
    string?: string;
    series?: number;
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
    alternative_player?: string;
    host?: string;
    series?: {
      first?: number;
      last?: number;
      string?: string;
    };
    // TODO: Add playlist
  };
  // TODO: Add torrents
};
