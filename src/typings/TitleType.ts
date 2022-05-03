// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TITLE_CONTENT_TYPE from '../constants/TITLE_CONTENT_TYPE';

export type TitleType = {
  code: TITLE_CONTENT_TYPE | null;
  fullString: string | null;
  length: string | null;
  series: number | null;
  string: string | null;
};
