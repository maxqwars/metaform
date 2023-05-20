import { API_METHOD_PATH } from "./enums";
import { URLConstructor } from "./core";

/* Schemas */
import { Options } from "./schemas";

export interface IMetaform3 {
  getTitle: Options.IGetTitleOptions;
  getTitleList: Options.IGetTitleListOptions;
  getTitleUpdates: Options.IGetTitleUpdatesOptions;
  getTitleChanges: Options.IGetTitleChangesOption;
  getTitleSchedule: Options.IGetTitleScheduleOptions;
  getTitleRandom: Options.IGetTitleRandomOptions;
  getTitleSearch(): Promise<void>;
  getTitleSearchAdvanced(): Promise<void>;
  getTitleFranchises(): Promise<void>;
  getYoutube(): Promise<void>;
  getFeed(): Promise<void>;
  getYears(): Promise<void>;
  getGenres(): Promise<void>;
  getTeam(): Promise<void>;
  getTorrentSeedStat(): Promise<void>;
  getTorrentRSS(): Promise<void>;
  getFranchiseList(): Promise<void>;
  getUser(): Promise<void>;
  getUserFavorites(): Promise<void>;
  putFavorites(): Promise<void>;
  deleteFavorites(): Promise<void>;
}

type TimeoutFetchOptions = RequestInit & {
  timeout?: number;
};

export class Metaform3 implements IMetaform3 {
  private readonly _urlConst: URLConstructor;

  constructor() {
    this._urlConst = new URLConstructor();
  }

  protected async _fetch<T>(
    url: string,
    options: TimeoutFetchOptions
  ): Promise<T> {
    // Set default timeout if set anybody else
    const timeout =
      typeof options.timeout !== "undefined" ? options.timeout : 100 * 1000;

    // Create DOM abort controller
    const abortController = new AbortController();

    // Create request cancel timer
    const abortTimer = setTimeout(() => {
      abortController.abort();
    }, timeout);

    // Send request and await response or timeout
    const response = await fetch(url, {
      ...options,
      signal: abortController.signal,
    });

    // Remove timeout
    clearTimeout(abortTimer);

    // Return data
    return response as T;
  }

  async getTitle(): Promise<void> {
    return;
  }
  async getTitleList(): Promise<void> {
    return;
  }
  async getTitleUpdates(): Promise<void> {
    return;
  }
  async getTitleChanges(): Promise<void> {
    return;
  }
  async getTitleSchedule(): Promise<void> {
    return;
  }
  async getTitleRandom(): Promise<void> {
    return;
  }
  async getTitleSearch(): Promise<void> {
    return;
  }
  async getTitleSearchAdvanced(): Promise<void> {
    return;
  }
  async getTitleFranchises(): Promise<void> {
    return;
  }
  async getYoutube(): Promise<void> {
    return;
  }
  async getFeed(): Promise<void> {
    return;
  }
  async getYears(): Promise<void> {
    return;
  }
  async getGenres(): Promise<void> {
    return;
  }
  async getTeam(): Promise<void> {
    return;
  }
  async getTorrentSeedStat(): Promise<void> {
    return;
  }
  async getTorrentRSS(): Promise<void> {
    return;
  }
  async getFranchiseList(): Promise<void> {
    return;
  }
  async getUser(): Promise<void> {
    return;
  }
  async getUserFavorites(): Promise<void> {
    return;
  }
  async putFavorites(): Promise<void> {
    return;
  }
  async deleteFavorites(): Promise<void> {
    return;
  }
}
