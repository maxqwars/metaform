// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import MetaModule from './MetaModule';
import { API_ENDPOINTS } from '../constants';
import { SearchTitlesQueryBuilder } from '../classes';
import { TitleParser } from '../functions';
import { ResponseTimeoutExceeded } from '../errors';
import {
  RawTitle,
  Title,
  MetaModuleOptions,
  MetaModuleResults,
  ISearchTitlesQueryParams,
  APIError,
} from '../typings';

export default class MetaSearch extends MetaModule {
  constructor(options: MetaModuleOptions) {
    super(options);
  }

  async searchTitles(
    params: ISearchTitlesQueryParams,
    timeout?: number
  ): Promise<MetaModuleResults<Title[]> | never> {
    this.requestURLBuilder.setEndpoint(API_ENDPOINTS.SEARCH_TITLES);

    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    const queryBuilder = new SearchTitlesQueryBuilder();

    queryBuilder
      .setAfter(params.after)
      .setDecor(params.decor)
      .setDescriptionType(params.descriptionType)
      .setEditing(params.editing)
      .setFilter(params.filter)
      .setGenres(params.genres)
      .setInclude(params.include)
      .setLimit(params.limit)
      .setPlaylistType(params.playlistType)
      .setRemove(params.remove)
      .setSearch(params.search)
      .setSeasonCode(params.seasonCode)
      .setTiming(params.timing)
      .setTranslator(params.translator)
      .setVoice(params.voice)
      .setYear(params.year);

    this.requestURLBuilder.setQueryParams(queryBuilder.build());

    function handler(title: RawTitle): Title {
      return TitleParser(title);
    }

    try {
      const response = await (
        await this.fetchWithTimeout(this.requestURLBuilder.build(), {
          timeout: requestTimeout,
        })
      ).json();

      return response.hasOwnProperty('error')
        ? this.createResults<Title[]>(true, null, response as APIError)
        : this.createResults(false, response.map(handler), null);
    } catch (error) {
      if ((error as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw error;
    }
  }

  async getGenres(timeout?: number): Promise<string[] | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    this.requestURLBuilder.setEndpoint(API_ENDPOINTS.GET_GENRES);

    try {
      return await (
        await this.fetchWithTimeout(this.requestURLBuilder.build(), {
          timeout: requestTimeout,
        })
      ).json();
    } catch (error) {
      if ((error as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw error;
    }
  }

  async getYears(timeout?: number): Promise<number[] | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    this.requestURLBuilder.setEndpoint(API_ENDPOINTS.GET_YEARS);

    try {
      return await (
        await this.fetchWithTimeout(this.requestURLBuilder.build(), {
          timeout: requestTimeout,
        })
      ).json();
    } catch (error) {
      if ((error as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw error;
    }
  }
}
