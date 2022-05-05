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
import { RawTitle, Title, IGetTitleQueryParams } from '../typings';
import { TitleParser } from '../functions';
import { RequestTimeoutError } from '../errors';

type DatabaseOptions = {
  baseUrl: string;
  version: API_VERSION;
  useHttps: boolean;
  timeout: number;
};

export default class Database extends CoreModule {
  private options: DatabaseOptions;

  constructor(options: DatabaseOptions) {
    super();
    this.options = options;
  }

  // eslint-disable-next-line prettier/prettier
  async getRandomTitle2(
    params?: IGetTitleQueryParams
  ): Promise<Title | null | never> {
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

    if (!DATA.hasOwnProperty('error')) {
      return TitleParser(DATA as RawTitle);
    }

    throw new RequestTimeoutError(timeout);

    // return null;
  }

  // async getRandomTitle(
  //   params?: IGetTitleQueryParams
  // ): Promise<Title | APIError | Error> {
  //   let apiResponse: Object;

  //   const Q_BUILD = new GetTitleQueryBuilder();

  //   const U_BUILD = new RequestUrlBuilder(
  //     this.options.baseUrl,
  //     this.options.version,
  //     this.options.useHttps
  //   );

  //   U_BUILD.setEndpoint(API_ENDPOINT.GET_RANDOM_TITLE);

  //   if (typeof params !== 'undefined') {
  //     Q_BUILD.setId(params.id)
  //       .setCode(params.code)
  //       .setFilter(params.filter)
  //       .setRemove(params.remove)
  //       .setInclude(params.include)
  //       .setTorrentId(params.torrentId)
  //       .setPlaylistType(params.playlistType)
  //       .setDescriptionType(params.descriptionType);
  //   }

  //   U_BUILD.setQueryParams(Q_BUILD.build());

  //   const FINAL_URL = U_BUILD.build();

  //   try {
  //     apiResponse = await (
  //       await this.fetchWithTimeout(FINAL_URL, this.options.timeout)
  //     ).json();
  //   } catch (e) {
  //     throw new Error('Unexpected error');
  //   }

  //   // eslint-disable-next-line no-prototype-builtins
  //   return apiResponse.hasOwnProperty('error')
  //     ? (apiResponse as APIError)
  //     : titleParser(apiResponse as RawTitle);
  // }

  // async getTitle(
  //   params: IGetTitleQueryParams
  // ): Promise<Title | APIError | Error> {
  //   let apiResponse: Object;

  //   const Q_BUILD = new GetTitleQueryBuilder();

  //   const U_BUILD = new RequestUrlBuilder(
  //     this.options.baseUrl,
  //     this.options.version,
  //     this.options.useHttps
  //   );

  //   U_BUILD.setEndpoint(API_ENDPOINT.GET_TITLE);

  //   Q_BUILD.setId(params.id)
  //     .setCode(params.code)
  //     .setFilter(params.filter)
  //     .setRemove(params.remove)
  //     .setInclude(params.include)
  //     .setTorrentId(params.torrentId)
  //     .setPlaylistType(params.playlistType)
  //     .setDescriptionType(params.descriptionType);

  //   U_BUILD.setQueryParams(Q_BUILD.build());

  //   const FINAL_URL = U_BUILD.build();

  //   try {
  //     apiResponse = await (
  //       await this.fetchWithTimeout(FINAL_URL, this.options.timeout)
  //     ).json();
  //   } catch (e) {
  //     throw new Error('Unexpected error');
  //   }

  //   // eslint-disable-next-line no-prototype-builtins
  //   return apiResponse.hasOwnProperty('error')
  //     ? (apiResponse as APIError)
  //     : titleParser(apiResponse as RawTitle);
  // }
}
