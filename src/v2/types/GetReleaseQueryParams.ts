import { SamplingQueryParams, FormatQueryParams } from "./";

export type GetReleaseQueryParams = SamplingQueryParams &
  FormatQueryParams & {
    code?: string;
    id?: number;
    torrentId?: number;
  };
