import { RAW_RESOURCE } from "../enums";

export type SamplingQueryParams = {
  filter?: string[];
  include?: RAW_RESOURCE[];
  remove?: string[];
};
