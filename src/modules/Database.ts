// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import API_VERSION from '../enums/API_VERSION';
import API_ENDPOINT from '../enums/API_ENDPOINTS';
import * as DatabaseTypes from '../typings/DatabaseTypes';
import * as SharedTypes from '../typings/SharedTypes';
import GetTitleQueryBuilder from '../classes/GetTitleQueryBuilder';
import RequestUrlBuilder from '../core/RequestURLBuilder';
import ModuleBase from './ModuleBase';

type DatabaseOptions = {
  baseUrl: string;
  version: API_VERSION;
  useHttps: boolean;
  timeout: number;
};

export default class Database extends ModuleBase {
  private options: DatabaseOptions;

  constructor(options: DatabaseOptions) {
    super();
    this.options = options;
  }

  async getTitle(
    params: DatabaseTypes.IGetTitleQueryParams
  ): Promise<DatabaseTypes.Title | SharedTypes.APIError | Error> {
    const { baseUrl, version, useHttps, timeout } = this.options;

    const {
      id,
      code,
      filter,
      remove,
      include,
      torrentId,
      playlistType,
      descriptionType,
    } = params;

    const Q_BUILD = new GetTitleQueryBuilder();
    const U_BUILD = new RequestUrlBuilder(baseUrl, version, useHttps);

    U_BUILD.setEndpoint(API_ENDPOINT.GET_TITLE);

    Q_BUILD.setId(id)
      .setCode(code)
      .setFilter(filter)
      .setRemove(remove)
      .setInclude(include)
      .setTorrentId(torrentId)
      .setPlaylistType(playlistType)
      .setDescriptionType(descriptionType);

    U_BUILD.setQueryParams(Q_BUILD.build());

    const FINAL_URL = U_BUILD.build();

    try {
      const response = await this.fetchWithTimeout(FINAL_URL, timeout);
      console.log(await response.json());
    } catch (e) {
      throw new Error('Connection timemout');
    }

    return {
      code: 0,
      message: 'Not implemented',
    };
  }
}
