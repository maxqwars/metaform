// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable no-prototype-builtins */

import { API_ENDPOINTS } from '../constants';
import { GetTitleQueryBuilder, GetUpdatesQueryBuilder } from '../classes';
import CoreModule from './CoreModule';
import {
  RawTitle,
  Title,
  IGetTitleQueryParams,
  APIError,
  ModuleOptions,
  IGetUpdatesQueryParams,
  ModuleResults,
} from '../typings';
import { TitleParser } from '../functions';

export default class Database extends CoreModule {
  // eslint-disable-next-line no-useless-constructor
  constructor(options: ModuleOptions) {
    super(options);
  }

  async getRandomTitle(
    params?: IGetTitleQueryParams
  ): Promise<ModuleResults<Title> | never> {
    const { timeout } = this.options;

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

    U_BUILD.setEndpoint(API_ENDPOINTS.GET_RANDOM_TITLE);
    U_BUILD.setQueryParams(Q_BUILD.build());

    const REQUEST_URL = U_BUILD.build();
    const API_REQUEST = await this.fetchWithTimeout(REQUEST_URL, timeout);
    const DATA = (await API_REQUEST.json()) as Object;

    if (DATA.hasOwnProperty('error')) {
      return {
        error: true,
        errorDetails: DATA as APIError,
      };
    }

    return {
      error: false,
      content: TitleParser(DATA as RawTitle),
    };
  }

  async getTitle(
    params: IGetTitleQueryParams
  ): Promise<ModuleResults<Title> | never> {
    const { timeout } = this.options;

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

    const REQUEST_URL = U_BUILD.build();
    const API_REQUEST = await this.fetchWithTimeout(REQUEST_URL, timeout);
    const DATA = (await API_REQUEST.json()) as Object;

    if (DATA.hasOwnProperty('error')) {
      return {
        error: true,
        errorDetails: DATA as APIError,
      };
    }

    return {
      error: false,
      content: TitleParser(DATA as RawTitle),
    };
  }

  async getUpdates(
    params?: IGetUpdatesQueryParams
  ): Promise<ModuleResults<Title[]> | never> {
    const { timeout } = this.options;

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
    U_BUILD.setEndpoint(API_ENDPOINTS.GET_UPDATES);
    U_BUILD.setQueryParams(Q_BUILD.build());

    /*  */
    const REQUEST_URL = U_BUILD.build();
    const API_REQUEST = await this.fetchWithTimeout(REQUEST_URL, timeout);
    const DATA = await API_REQUEST.json();

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

  // async getChanges() {
  //   throw new Error('Method not implemented');
  // }
}
