import { RAW_RESOURCE } from "../constants";

export interface ISamplingQuery {
  filter?: string[];
  include?: RAW_RESOURCE[];
  remove?: string[];
}
