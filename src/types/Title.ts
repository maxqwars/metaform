export type Title = {
  id?: number;
  code?: string;
  names?: {
    ru?: string;
    en?: string;
    alternative?: string | null;
  };
  announce?: string | null;
  status?: {
    string?: string;
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
    alternative_player?: string | null;
    host?: string;
    series?: {
      first?: number;
      last?: number;
      string?: string;
    };
    playlist?: {
      [key: string]: {
        serie?: number;
        created_timestamp?: number;
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
    rutube_playlist?: {
      [key: string]: {
        serie?: number;
        created_timestamp?: number;
        rutube_id?: string;
      };
    };
  };
  torrents?: {
    series?: {
      first?: number;
      last?: number;
      string?: string;
    };
    list?: [
      {
        torrent_id?: number;
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
        uploaded_timestamp?: number;
        hash?: string;
        metadata?: null | {
          hash?: string;
          name?: string;
          announce?: string[];
          created_timestamp?: number;
          files_list?: {
            file?: string;
            size?: number;
            offset?: number;
          }[];
        };
        raw_base64_file?: null | string;
      }
    ];
  };
};
