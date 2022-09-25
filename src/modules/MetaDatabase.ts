import { MetaModule } from "../core";
import { MetaModuleOptions, MetaModuleResponse, Title } from "../types";
import { API_METHOD, MOD_ERR } from "../enums";

export class MetaDatabase extends MetaModule {
  constructor(options?: MetaModuleOptions) {
    super(options);
  }

  async getTitle() {
    throw Error("Not implemented");
  }

  async getFromList() {
    throw Error("Not implemented");
  }

  async getChanged(): Promise<MetaModuleResponse<Title[] | null>> {
    const requestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_CHANGES)
      .useQuery("")
      .build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {});
      return this._makeResponse<Title[]>(false, await response.json());
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  async getRandomRelease(): Promise<MetaModuleResponse<Title | null>> {
    const requestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_RANDOM_TITLE)
      .useQuery("")
      .build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {});
      return this._makeResponse<Title>(false, await response.json());
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  async getYearsList(): Promise<MetaModuleResponse<number[] | null>> {
    const requestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_YEARS)
      .useQuery("")
      .build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {
        timeout: this._options.timeout,
      });
      return this._makeResponse<number[]>(false, await response.json());
    } catch (e) {
      return this._makeResponse(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  async getGenresList(): Promise<MetaModuleResponse<string[] | null>> {
    const requestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_GENRES)
      .useQuery("")
      .build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {
        timeout: this._options.timeout,
      });
      return this._makeResponse<string[]>(false, await response.json());
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  find() {
    throw Error("Not implemented");
  }

  search() {
    throw Error("Not implemented");
  }

  getUpdates() {
    throw Error("Not implemented");
  }
}
