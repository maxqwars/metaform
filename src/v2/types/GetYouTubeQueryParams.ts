import { ShiftQueryParams } from ".";

export type GetYouTubeQueryParams = ShiftQueryParams & {
  filter?: string[];
  remove?: string[];
  limit?: number;
};
