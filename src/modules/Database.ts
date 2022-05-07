// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable no-prototype-builtins */

import API_VERSION from '../constants/API_VERSION';
import API_ENDPOINT from '../constants/API_ENDPOINTS';
import GetTitleQueryBuilder from '../classes/GetTitleQueryBuilder';
import RequestUrlBuilder from '../core/RequestURLBuilder';
import CoreModule from './CoreModule';
import { RawTitle, Title, IGetTitleQueryParams, APIError } from '../typings';
import { TitleParser } from '../functions';

type DatabaseOptions = {
  baseUrl: string;
  version: API_VERSION;
  useHttps: boolean;
  timeout: number;
};

type GetTitleResults = {
  error: boolean;
  content?: Title;
  errorDetails?: APIError;
};

export default class Database extends CoreModule {
  private options: DatabaseOptions;

  constructor(options: DatabaseOptions) {
    super();
    this.options = options;
  }

  async getRandomTitle(
    params?: IGetTitleQueryParams
  ): Promise<GetTitleResults | never> {
    const { baseUrl, version, useHttps, timeout } = this.options;

    const U_BUILD = new RequestUrlBuilder(baseUrl, version, useHttps);
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

    U_BUILD.setEndpoint(API_ENDPOINT.GET_RANDOM_TITLE);
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
  ): Promise<GetTitleResults | never> {
    const { baseUrl, version, useHttps, timeout } = this.options;

    const U_BUILD = new RequestUrlBuilder(baseUrl, version, useHttps);
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

    U_BUILD.setEndpoint(API_ENDPOINT.GET_TITLE);
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

  async getGenres(): Promise<string[] | never> {
    const { baseUrl, version, useHttps, timeout } = this.options;
    const U_BUILD = new RequestUrlBuilder(baseUrl, version, useHttps);
    U_BUILD.setEndpoint(API_ENDPOINT.GET_GENRES);

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
    const { baseUrl, version, useHttps, timeout } = this.options;
    const U_BUILD = new RequestUrlBuilder(baseUrl, version, useHttps);
    U_BUILD.setEndpoint(API_ENDPOINT.GET_YEARS);

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
