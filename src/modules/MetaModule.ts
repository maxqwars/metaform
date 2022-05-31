// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// TODO: Maybe move MetaModule->Core?

import RequestUrlBuilder from '../core/RequestURLBuilder';
import { MetaModuleOptions, MetaModuleResults, APIError } from '../typings';

// eslint-disable-next-line no-undef
interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number;
}

export default class MetaModule {
  protected requestURLBuilder: RequestUrlBuilder;
  protected options: MetaModuleOptions;

  constructor(options: MetaModuleOptions) {
    this.requestURLBuilder = new RequestUrlBuilder(
      options.baseUrl,
      options.version,
      options.useHttps
    );
    this.options = options;
  }

  protected async fetchWithTimeout(
    url: string,
    options: FetchWithTimeoutOptions
  ) {
    const timeout =
      typeof options.timeout !== 'undefined'
        ? options.timeout
        : this.options.timeout;

    const reqAbortCtrl = new AbortController();
    const reqAbortTimer = setTimeout(() => reqAbortCtrl.abort(), timeout);

    const response = await fetch(url, {
      signal: reqAbortCtrl.signal,
      ...options,
    });

    clearTimeout(reqAbortTimer);
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  protected createResults<T>(
    error: boolean,
    content: T | null,
    errorDetails: APIError | null
  ): MetaModuleResults<T> {
    if (error && errorDetails !== null)
      return {
        error,
        errorDetails,
      };

    if (!error && content !== null)
      return {
        error,
        content,
      };

    throw Error('');
  }
}
