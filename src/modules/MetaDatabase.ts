/* eslint-disable no-undef */
// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CoreModule from './MetaModule';
import { API_ENDPOINTS } from '../constants';
import { GetTitleQueryBuilder, GetUpdatesQueryBuilder } from '../classes';
import { TitleParser } from '../functions';
import { ResponseTimeoutExceeded } from '../errors';
import {
  RawTitle,
  Title,
  IGetTitleQueryParams,
  APIError,
  MetaModuleOptions,
  IGetUpdatesQueryParams,
  MetaModuleResults,
} from '../typings';

export default class MetaDatabase extends CoreModule {
  constructor(options: MetaModuleOptions) {
    super(options);
  }

  async getRandomTitle(
    params?: IGetTitleQueryParams,
    timeout?: number
  ): Promise<MetaModuleResults<Title> | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;
    const queryBuilder = new GetTitleQueryBuilder();

    if (typeof params !== 'undefined') {
      queryBuilder
        .setId(params.id)
        .setCode(params.code)
        .setFilter(params.filter)
        .setRemove(params.remove)
        .setInclude(params.include)
        .setTorrentId(params.torrentId)
        .setPlaylistType(params.playlistType)
        .setDescriptionType(params.descriptionType);
    }

    const data = await this.fetchRaw(
      API_ENDPOINTS.GET_RANDOM_TITLE,
      queryBuilder.build(),
      requestTimeout
    );

    return data.hasOwnProperty('error')
      ? this.createResults<Title>(true, null, data as APIError)
      : this.createResults(false, TitleParser(data as RawTitle), null);
  }

  async getTitle(
    params: IGetTitleQueryParams,
    timeout?: number
  ): Promise<MetaModuleResults<Title> | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    const queryBuilder = new GetTitleQueryBuilder();
    queryBuilder
      .setId(params.id)
      .setCode(params.code)
      .setFilter(params.filter)
      .setRemove(params.remove)
      .setInclude(params.include)
      .setTorrentId(params.torrentId)
      .setPlaylistType(params.playlistType)
      .setDescriptionType(params.descriptionType);

    const data = await this.fetchRaw(
      API_ENDPOINTS.GET_TITLE,
      queryBuilder.build(),
      requestTimeout
    );

    return data.hasOwnProperty('error')
      ? this.createResults<Title>(true, null, data as APIError)
      : this.createResults(false, TitleParser(data as RawTitle), null);
  }

  private async fetchRaw(
    endpoint: API_ENDPOINTS,
    query: string,
    timeout: number
  ): Promise<RawTitle | APIError | never> {
    this.requestURLBuilder.setEndpoint(endpoint);
    this.requestURLBuilder.setQueryParams(query);

    try {
      const response = await (
        await this.fetchWithTimeout(this.requestURLBuilder.build(), {
          timeout,
        })
      ).json();

      return response.hasOwnProperty('error')
        ? (response as APIError)
        : (response as RawTitle);
    } catch (error) {
      if ((error as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw error;
    }
  }

  async getUpdates(
    params?: IGetUpdatesQueryParams,
    timeout?: number
  ): Promise<MetaModuleResults<Title[]> | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    this.requestURLBuilder.setEndpoint(API_ENDPOINTS.GET_UPDATES);

    if (typeof params !== 'undefined') {
      const queryBuilder = new GetUpdatesQueryBuilder();
      queryBuilder
        .setAfter(params.after)
        .setDescriptionType(params.descriptionType)
        .setFilter(params.filter)
        .setInclude(params.include)
        .setLimit(params.limit)
        .setPlaylistType(params.playlistType)
        .setRemove(params.remove)
        .setSince(params.since);
      this.requestURLBuilder.setQueryParams(queryBuilder.build());
    }

    /*  */
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
    } catch (e: unknown) {
      if ((e as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw e;
    }
  }
}
