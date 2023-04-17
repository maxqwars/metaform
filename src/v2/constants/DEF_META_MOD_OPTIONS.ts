import { MetaModuleOptions } from "../types";
import { API_VER } from "../enums";

export const DEF_META_MOD_OPTIONS: MetaModuleOptions = {
  host: "api.anilibria.tv",
  version: API_VER.V2,
  https: true,
  timeout: 6000,
};
