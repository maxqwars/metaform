// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable no-unused-vars */

import { QueryBuilderBase } from '../core';
import {
  INCLUDED_RESOURCES,
  DESCRIPTION_TYPE,
  PLAYLIST_TYPE,
} from '../constants';

export interface IGetUpdatesQueryBuilder {
  build(): string;
  setFilter(list?: string[]): IGetUpdatesQueryBuilder;
  setRemove(list?: string[]): IGetUpdatesQueryBuilder;
  setInclude(list?: INCLUDED_RESOURCES[]): IGetUpdatesQueryBuilder;
  setLimit(limit?: number): IGetUpdatesQueryBuilder;
  setSince(since?: number): IGetUpdatesQueryBuilder;
  setDescriptionType(type?: DESCRIPTION_TYPE): IGetUpdatesQueryBuilder;
  setPlaylistType(type?: PLAYLIST_TYPE): IGetUpdatesQueryBuilder;
  setAfter(after?: number): IGetUpdatesQueryBuilder;
}

export default class GetUpdatesQueryBuilder
  extends QueryBuilderBase
  implements IGetUpdatesQueryBuilder
{
  setFilter(list?: string[] | undefined): IGetUpdatesQueryBuilder {
    if (list) super.addParam('filter', list);
    return this;
  }

  setRemove(list?: string[] | undefined): IGetUpdatesQueryBuilder {
    if (list) super.addParam('remove', list);
    return this;
  }

  setInclude(list?: INCLUDED_RESOURCES[] | undefined): IGetUpdatesQueryBuilder {
    if (list) super.addParam('include', list);
    return this;
  }

  setLimit(limit?: number | undefined): IGetUpdatesQueryBuilder {
    if (limit) super.addParam('limit', limit);
    return this;
  }

  setSince(since?: number | undefined): IGetUpdatesQueryBuilder {
    if (since) super.addParam('since', since);
    return this;
  }

  setDescriptionType(
    type?: DESCRIPTION_TYPE | undefined
  ): IGetUpdatesQueryBuilder {
    if (type) super.addParam('description_type', type);
    return this;
  }

  setPlaylistType(type?: PLAYLIST_TYPE | undefined): IGetUpdatesQueryBuilder {
    if (type) super.addParam('playlist_type', type);
    return this;
  }

  setAfter(after?: number | undefined): IGetUpdatesQueryBuilder {
    if (after) super.addParam('after', after);
    return this;
  }

  build(): string {
    return super.build();
  }
}
