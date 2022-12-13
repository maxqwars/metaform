import { MetaModule } from "../core";
import { MetaModuleOptions, MetaModuleResponse, Title } from "../types";
import { API_METHOD, MOD_ERR } from "../enums";

export class MetaDatabase extends MetaModule {
  constructor(options?: MetaModuleOptions) {
    super(options);
  }

  async get(params: {
    code?: string;
    id?: number;
  }): Promise<MetaModuleResponse<Title | null>> {
    if (typeof params.code === "undefined" && typeof params.id === "undefined")
      return this._makeResponse(true, null, MOD_ERR.REQUIRED_PARAM_IS_EMPTY);

    const requestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_TITLE)
      .useQuery(`id=${params.id}`)
      .build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {});
      const data = await response.json();

      if (data["error"]) {
        return this._makeResponse<null>(true, null, MOD_ERR.RELEASE_NOT_FOUND);
      }

      return this._makeResponse<Title>(false, data);
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }

  async getFromList() {
    // TODO: Implement MetaDatabase.getFromList()
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
    // TODO: Implement MetaDatabase.find()
    throw Error("Not implemented");
  }

  search() {
    // TODO: Implement MetaDatabase.search()
    throw Error("Not implemented");
  }

  async getUpdated(): Promise<MetaModuleResponse<Title[] | null>> {
    const requestUrl = this._urlBuilder
      .useMethod(API_METHOD.GET_UPDATES)
      .useQuery("")
      .build();

    try {
      const response = await this._fetchWithTimeout(requestUrl, {});
      return this._makeResponse<Title[]>(false, await response.json());
    } catch (e) {
      return this._makeResponse<null>(true, null, MOD_ERR.UNKNOWN_ERROR);
    }
  }
}
