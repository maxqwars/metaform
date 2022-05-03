// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TITLE_STATUS from '../constants/TITLE_STATUS';

export type TitleStatus = {
  code: TITLE_STATUS | null;
  string: string | null;
};
