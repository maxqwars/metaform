import { DEF_META_MOD_OPTIONS } from "../constants";
import { MetaModuleOptions, MetaModuleResponse } from "../types";
import { UrlBuilder } from "./UrlBuilder";
import { MOD_ERR } from "../enums";

interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number;
}

export class MetaModule {
  protected _options: MetaModuleOptions = DEF_META_MOD_OPTIONS;
  protected _urlBuilder: UrlBuilder;

  constructor(options?: MetaModuleOptions) {
    // Overwrite the default option values if they were passed to the constructor
    if (options) this._options = options;

    // Initializing a class for building url requests to the API
    this._urlBuilder = new UrlBuilder(
      this._options.host,
      this._options.version,
      this._options.https
    );
  }

  protected async _fetchWithTimeout(
    url: string,
    options: FetchWithTimeoutOptions
  ) {
    // Define the request timeout
    const timeout =
      typeof options.timeout !== "undefined"
        ? options.timeout
        : this._options.timeout;

    // Initialize the abort controller for the request
    const requestAbortController = new AbortController();

    // Timer after which the request will be canceled
    const requestAbortTimer = setTimeout(
      () => requestAbortController.abort(),
      timeout
    );

    // Waiting for a response to the request or the expiration of the response timer
    //! If an answer is received, the execution will continue, otherwise an exception will be thrown
    const response = await fetch(url, {
      signal: requestAbortController.signal,
      ...options,
    });

    // Clearing the timer and returning the response
    clearTimeout(requestAbortTimer);
    return response;
  }

  protected _makeResponse<T>(
    error: boolean,
    content?: T,
    moduleErrType?: MOD_ERR
  ): MetaModuleResponse<T> {
    return {
      error,
      content: content ? content : null,
      moduleErrType: moduleErrType ? moduleErrType : null,
    };
  }
}
