import { SamplingQueryParams, FormatQueryParams } from "./";

export type GetFavoritesQueryParams = SamplingQueryParams &
  FormatQueryParams & {
    session: string;
  };
