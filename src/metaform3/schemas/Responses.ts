import * as Objects from "./Objects";
import { METAFORM_ERROR } from "../enums";

export type MetaformResponse = {
  error: METAFORM_ERROR | null;
};

export type GetTitleResponse = MetaformResponse & {
  data: Objects.Title | null;
};
