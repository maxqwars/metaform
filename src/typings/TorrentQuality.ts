// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type TorrentQuality = {
  encoder: string | null;
  lq_audio: boolean | null;
  resolution: number | null;
  string: string | null;
  type: string | null;
};
