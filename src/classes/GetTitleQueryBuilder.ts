// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable no-unused-vars */

// TODO: Refactor
// TODO: Optimize this shit

import { QueryBuilderBase } from '../core';
import {
  INCLUDED_RESOURCES,
  DESCRIPTION_TYPE,
  PLAYLIST_TYPE,
} from '../constants';

export interface IGetTitleQueryBuilder {
  build(): string;
  setId(id?: number): IGetTitleQueryBuilder;
  setCode(code?: string): IGetTitleQueryBuilder;
  setFilter(keys?: string[]): IGetTitleQueryBuilder;
  setRemove(keys?: string[]): IGetTitleQueryBuilder;
  setInclude(resources?: INCLUDED_RESOURCES[]): IGetTitleQueryBuilder;
  setTorrentId(id?: number): IGetTitleQueryBuilder;
  setDescriptionType(type?: DESCRIPTION_TYPE): IGetTitleQueryBuilder;
  setPlaylistType(type?: PLAYLIST_TYPE): IGetTitleQueryBuilder;
}

export default class GetTitleQueryBuilder
  extends QueryBuilderBase
  implements IGetTitleQueryBuilder
{
  setId(id?: number): IGetTitleQueryBuilder {
    if (id) super.addParam('id', id);
    return this;
  }

  setCode(code?: string): IGetTitleQueryBuilder {
    if (code) super.addParam('code', code);
    return this;
  }

  setFilter(keys?: string[]): IGetTitleQueryBuilder {
    if (keys) super.addParam('filter', keys);
    return this;
  }

  setRemove(keys?: string[]): IGetTitleQueryBuilder {
    if (keys) super.addParam('remove', keys);
    return this;
  }

  setInclude(keys?: INCLUDED_RESOURCES[]): IGetTitleQueryBuilder {
    if (keys) super.addParam('include', keys);
    return this;
  }

  setTorrentId(id?: number): IGetTitleQueryBuilder {
    if (id) super.addParam('torrent_id', id);
    return this;
  }

  setDescriptionType(type?: DESCRIPTION_TYPE): IGetTitleQueryBuilder {
    if (type) super.addParam('description_type', type);
    return this;
  }

  setPlaylistType(type?: PLAYLIST_TYPE): IGetTitleQueryBuilder {
    if (type) super.addParam('playlist_type', type);
    return this;
  }

  build() {
    return super.build();
  }
}
