// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as DatabaseTypes from '../typings/Title';
import { RawTitle } from '../typings/RawTitle';

/* eslint-disable no-extra-boolean-cast */

function TitleParser(data: RawTitle): DatabaseTypes.Title {
  return {
    /* Primitive */
    id: !!data.id ? data.id : null,
    code: !!data.code ? data.code : null,
    description: !!data.description ? data.description : null,
    genres: !!data.genres ? data.genres : null,
    inFavorites: !!data.in_favorites ? data.in_favorites : null,
    lastChange: !!data.last_change ? data.last_change : null,
    updated: !!data.updated ? data.updated : null,
  };
}

export default TitleParser;
