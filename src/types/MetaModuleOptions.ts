import { API_VER } from "../enums";

export type MetaModuleOptions = {
  host: string;
  version: API_VER;
  https: boolean;
  timeout: number;
};
