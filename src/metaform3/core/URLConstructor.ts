import { API_METHOD_PATH } from "../enums";

export class URLConstructor {
  /* Readonly properties */
  private readonly _enableHttps: boolean;
  private readonly _useApiVer: string;
  private readonly _domain: string;

  get domain() {
    return this._domain;
  }

  /* Settable properties */
  private _apiMethod: API_METHOD_PATH | null;
  private _query: string;

  constructor(apiVer?: string, domain?: string, https?: boolean) {
    this._useApiVer = apiVer ? apiVer : "v3";
    this._domain = domain ? domain : "api.anilibria.tv";
    this._enableHttps = typeof https === "undefined" ? true : https;

    this._apiMethod = null;
    this._query = "";
  }

  setQueryString(queryString: string): URLConstructor {
    this._query = queryString;
    return this;
  }

  setApiMethod(method: API_METHOD_PATH): URLConstructor {
    this._apiMethod = method;
    return this;
  }

  reset() {
    this._query = "";
    this._apiMethod = null;
  }

  public construct(): string {
    let final = "";

    final += this._enableHttps ? "https://" : "http://";
    final += this._domain;
    final += `/${this._useApiVer}/`;
    final += this._apiMethod;
    final += `?${this._query}`;

    return final;
  }
}
