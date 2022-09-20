import { ISamplingQuery, IFormatQuery } from "./";

export interface IGetReleaseQuery extends ISamplingQuery, IFormatQuery {
  code?: string;
  id?: number;
  torrentId?: number;
}
