import * as Objects from "./Objects";
import { METAFORM_ERROR } from "../enums";

export type MetaformResponse = {
  error: METAFORM_ERROR | null;
};

export type GetTitleResponse = MetaformResponse & {
  data: Objects.Title | null;
};

export type GetTitleListResponse = MetaformResponse & {
  data: Objects.Title[] | null;
};

export type GetYearsResponse = MetaformResponse & {
  data: number[] | null;
};

export type GetGenresResponse = MetaformResponse & {
  data: string[] | null;
};

export type GetTeamResponse = MetaformResponse & {
  data: Objects.TitleTeam | null;
};

export type GetTitleChangesAndUpdatesResponse = MetaformResponse & {
  data: Objects.TitleChanges | null;
};

export type GetFranshiseListResponse = MetaformResponse & {
  data: Objects.FranshiseList | null;
};
