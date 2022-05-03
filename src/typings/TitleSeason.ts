// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TITLE_SEASON from '../constants/TITLE_SEASON';
import WEEK_DAY from '../constants/WEEK_DAY';

export type TitleSeason = {
  code: TITLE_SEASON | null;
  string: string | null;
  weekDay: WEEK_DAY | null;
  year: number | null;
};
