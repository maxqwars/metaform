// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TorrentQuality } from './TorrentQuality';
import { TitleSeries } from './TitleSeries';

export type Torrent = {
  quality: TorrentQuality;
  downloads: number | number;
  leechers: number | number;
  metadata: null;
  raw_base64_file: string | null;
  seeders: number | number;
  series: TitleSeries | null;
  torrentId: number | null;
  totalSize: number | number;
  uploadedTimestamp: number | null;
  url: string | null;
};
