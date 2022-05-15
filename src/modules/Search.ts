// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { API_ENDPOINTS } from '../constants';
import { SearchTitlesQueryBuilder } from '../classes';
import {
  ModuleOptions,
  ISearchTitlesQueryParams,
  RawTitle,
  Title,
  ModuleResults,
  APIError,
} from '../typings';
import CoreModule from './CoreModule';
import { TitleParser } from '../functions';

export default class Search extends CoreModule {
  // eslint-disable-next-line no-useless-constructor
  constructor(options: ModuleOptions) {
    super(options);
  }

  async searchTitles(
    params: ISearchTitlesQueryParams
  ): Promise<ModuleResults<Title[]> | never> {
    const { timeout } = this.options;

    /* Init required modules */
    const U_BUILD = this.requestURLBuilder;
    const Q_BUILD = new SearchTitlesQueryBuilder();

    /* Configure query params */
    Q_BUILD.setAfter(params.after)
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

    /*  */
    U_BUILD.setEndpoint(API_ENDPOINTS.SEARCH_TITLES);
    U_BUILD.setQueryParams(Q_BUILD.build());

    /* Request data */
    const REQUEST_URL = U_BUILD.build();
    const API_REQUEST = await this.fetchWithTimeout(REQUEST_URL, timeout);
    const DATA = await API_REQUEST.json();

    // eslint-disable-next-line no-prototype-builtins
    if (DATA.hasOwnProperty('error') as Object) {
      return {
        error: true,
        errorDetails: DATA as APIError,
      };
    }

    function handler(title: RawTitle): Title {
      return TitleParser(title);
    }

    return {
      error: false,
      content: DATA.map(handler),
    };
  }

  async getGenres(): Promise<string[] | never> {
    const { timeout } = this.options;
    const U_BUILD = this.requestURLBuilder;
    U_BUILD.setEndpoint(API_ENDPOINTS.GET_GENRES);

    const REQUEST_URL = U_BUILD.build();

    try {
      const API_REQUEST = await this.fetchWithTimeout(REQUEST_URL, timeout);
      const DATA = (await API_REQUEST.json()) as string[];
      return DATA;
    } catch (e) {
      throw new Error('Failed fetch genres list');
    }
  }

  async getYears(): Promise<number[] | never> {
    const { timeout } = this.options;
    const U_BUILD = this.requestURLBuilder;
    U_BUILD.setEndpoint(API_ENDPOINTS.GET_YEARS);

    const REQUEST_URL = U_BUILD.build();

    try {
      const API_REQUEST = await this.fetchWithTimeout(REQUEST_URL, timeout);
      const DATA = (await API_REQUEST.json()) as number[];
      return DATA;
    } catch (e) {
      throw new Error('Failed fetch genres list');
    }
  }
}
