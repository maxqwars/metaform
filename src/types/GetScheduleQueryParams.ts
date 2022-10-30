import { FormatQueryParams, SamplingQueryParams } from "./";

export type GetScheduleQueryParams = FormatQueryParams &
  SamplingQueryParams & {
    days?: number[];
  };
