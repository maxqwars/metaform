// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable no-prototype-builtins */

import API_ENDPOINT from '../constants/API_ENDPOINTS';
import GetTitleQueryBuilder from '../classes/GetTitleQueryBuilder';
import CoreModule from './CoreModule';
import {
  RawTitle,
  Title,
  IGetTitleQueryParams,
  APIError,
  ModuleOptions,
} from '../typings';
import { TitleParser } from '../functions';

type GetTitleResults = {
  error: boolean;
  content?: Title;
  errorDetails?: APIError;
};

export default class Database extends CoreModule {
  // eslint-disable-next-line no-useless-constructor
  constructor(options: ModuleOptions) {
    super(options);
  }

  async getRandomTitle(
    params?: IGetTitleQueryParams
  ): Promise<GetTitleResults | never> {
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
}
