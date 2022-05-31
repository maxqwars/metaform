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
    this.requestURLBuilder.setEndpoint(API_ENDPOINTS.GET_RANDOM_TITLE);
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    if (typeof params !== 'undefined') {
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
      this.requestURLBuilder.setQueryParams(queryBuilder.build());
    }

    try {
      const response = await (
        await this.fetchWithTimeout(this.requestURLBuilder.build(), {
          timeout: requestTimeout,
        })
      ).json();

      return response.hasOwnProperty('error')
        ? this.createResults<Title>(true, null, response as APIError)
        : this.createResults(false, TitleParser(response as RawTitle), null);
    } catch (e: unknown) {
      if ((e as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw e;
    }
  }

  async getTitle(
    params: IGetTitleQueryParams,
    timeout?: number
  ): Promise<MetaModuleResults<Title> | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    const U_BUILD = this.requestURLBuilder;
    const Q_BUILD = new GetTitleQueryBuilder();

    if (typeof params !== 'undefined') {
      Q_BUILD.setId(params.id)
        .setCode(params.code)
        .setFilter(params.filter)
        .setRemove(params.remove)
        .setInclude(params.include)
        .setTorrentId(params.torrentId)
        .setPlaylistType(params.playlistType)
        .setDescriptionType(params.descriptionType);
    }

    U_BUILD.setEndpoint(API_ENDPOINTS.GET_TITLE);
    U_BUILD.setQueryParams(Q_BUILD.build());

    try {
      const REQ = await this.fetchWithTimeout(U_BUILD.build(), {
        timeout: requestTimeout,
      });

      const RESPONSE = (await REQ.json()) as Object;

      if (RESPONSE.hasOwnProperty('error')) {
        return {
          error: true,
          errorDetails: RESPONSE as APIError,
        };
      }

      return {
        error: false,
        content: TitleParser(RESPONSE as RawTitle),
      };
    } catch (e: unknown) {
      if ((e as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw e;
    }
  }

  async getUpdates(
    params?: IGetUpdatesQueryParams,
    timeout?: number
  ): Promise<MetaModuleResults<Title[]> | never> {
    const requestTimeout =
      typeof timeout !== 'undefined' ? timeout : this.options.timeout;

    const U_BUILD = this.requestURLBuilder;
    const Q_BUILD = new GetUpdatesQueryBuilder();

    if (params) {
      Q_BUILD.setAfter(params.after)
        .setDescriptionType(params.descriptionType)
        .setFilter(params.filter)
        .setInclude(params.include)
        .setLimit(params.limit)
        .setPlaylistType(params.playlistType)
        .setRemove(params.remove)
        .setSince(params.since);
    }

    /*  */
    function handler(title: RawTitle): Title {
      return TitleParser(title);
    }

    /*  */
    U_BUILD.setEndpoint(API_ENDPOINTS.GET_UPDATES);
    U_BUILD.setQueryParams(Q_BUILD.build());

    try {
      const REQ = await this.fetchWithTimeout(U_BUILD.build(), {
        timeout: requestTimeout,
      });

      const RESPONSE = await REQ.json();

      if (RESPONSE.hasOwnProperty('error')) {
        return {
          error: true,
          errorDetails: RESPONSE as APIError,
        };
      }

      return {
        error: false,
        content: RESPONSE.map(handler),
      };
    } catch (e: unknown) {
      if ((e as Error).name === 'AbortError')
        throw new ResponseTimeoutExceeded();

      throw e;
    }
  }
}
