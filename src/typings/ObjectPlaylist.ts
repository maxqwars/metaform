// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type ObjectPlaylist = {
  [key: number]: {
    id: number;
    createdTimestamp: number;
    hls: {
      fhd: string | null;
      hd: string | null;
      sd: string | null;
    } | null;
  };
};
