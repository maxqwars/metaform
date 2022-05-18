// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type ObjectPlaylist = {
  [key: number]: {
    serie: number | null;
    createdTimestamp: number | null;
    preview: null;
    skips: {
      opening: [] | null;
      ending: [] | null;
    } | null;
    hls: {
      fhd: string | null;
      hd: string | null;
      sd: string | null;
    } | null;
  };
};
