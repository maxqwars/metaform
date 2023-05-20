import { MOD_ERR } from "../enums";

export type MetaModuleResponse<T> = {
  error: boolean;
  content: T | null;
  moduleErrType: MOD_ERR | null;
};
