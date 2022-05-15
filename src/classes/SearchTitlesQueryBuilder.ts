// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable no-unused-vars */

import QueryBuilderBase from '../core/QueryBuilderBase';
import INCLUDE_RESOURCES from '../constants/INCLUDED_RESOURCES';
import DESCRIPTION_TYPE from '../constants/DESCRIPTION_TYPE';
import PLAYLIST_TYPE from '../constants/PLAYLIST_TYPE';
import TITLE_SEASON from '../constants/TITLE_SEASON';

export interface ISearchTitleQueryBuilder {
  build(): string;
  setSearch(query?: string): ISearchTitleQueryBuilder;
  setYear(year?: number): ISearchTitleQueryBuilder;
  setSeasonCode(code?: TITLE_SEASON): ISearchTitleQueryBuilder;
  setGenres(list?: string[]): ISearchTitleQueryBuilder;
  setVoice(list?: string[]): ISearchTitleQueryBuilder;
  setTranslator(list?: string[]): ISearchTitleQueryBuilder;
  setEditing(list?: string[]): ISearchTitleQueryBuilder;
  setDecor(list?: string[]): ISearchTitleQueryBuilder;
  setTiming(list?: string[]): ISearchTitleQueryBuilder;
  setFilter(list?: string[]): ISearchTitleQueryBuilder;
  setRemove(list?: string[]): ISearchTitleQueryBuilder;
  setInclude(list?: INCLUDE_RESOURCES[]): ISearchTitleQueryBuilder;
  setDescriptionType(type?: DESCRIPTION_TYPE): ISearchTitleQueryBuilder;
  setPlaylistType(type?: PLAYLIST_TYPE): ISearchTitleQueryBuilder;
  setLimit(limit?: number): ISearchTitleQueryBuilder;
  setAfter(after?: number): ISearchTitleQueryBuilder;
}

export default class SearchTitlesQueryBuilder
  extends QueryBuilderBase
  implements ISearchTitleQueryBuilder
{
  build(): string {
    return super.build();
  }

  setSearch(query?: string): ISearchTitleQueryBuilder {
    if (query) super.addParam('search', query);
    return this;
  }

  setYear(year?: number): ISearchTitleQueryBuilder {
    if (year) super.addParam('year', year);
    return this;
  }

  setSeasonCode(code?: TITLE_SEASON): ISearchTitleQueryBuilder {
    if (code) super.addParam('season_code', code);
    return this;
  }

  setGenres(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('genres', list);
    return this;
  }

  setVoice(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('voice', list);
    return this;
  }

  setTranslator(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('translator', list);
    return this;
  }

  setEditing(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('editing', list);
    return this;
  }

  setDecor(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('decor', list);
    return this;
  }

  setTiming(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('timing', list);
    return this;
  }

  setFilter(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('filter', list);
    return this;
  }

  setRemove(list?: string[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('remove', list);
    return this;
  }

  setInclude(list?: INCLUDE_RESOURCES[]): ISearchTitleQueryBuilder {
    if (list) super.addParam('include', list);
    return this;
  }

  setDescriptionType(type?: DESCRIPTION_TYPE): ISearchTitleQueryBuilder {
    if (type) super.addParam('description_type', type);
    return this;
  }

  setPlaylistType(type?: PLAYLIST_TYPE): ISearchTitleQueryBuilder {
    if (type) super.addParam('playlist_type', type);
    return this;
  }

  setLimit(limit?: number): ISearchTitleQueryBuilder {
    if (limit) super.addParam('limit', limit);
    return this;
  }

  setAfter(after?: number): ISearchTitleQueryBuilder {
    if (after) super.addParam('after', after);
    return this;
  }
}
