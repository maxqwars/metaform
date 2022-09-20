import { RAW_RESOURCE } from "../enums";

export interface ISamplingQuery {
  filter?: string[];
  include?: RAW_RESOURCE[];
  remove?: string[];
}
