import { API_METHOD, API_VER } from '../constants';

export class UrlBuilder {
  private _https: boolean;
  private _apiVersion: API_VER;
  private _method: API_METHOD;
  private _query: string;
  private _host: string;

  constructor(host: string, version: API_VER, https = true) {
    this._https = https;
    this._apiVersion = version;
    this._method = API_METHOD.GET_TITLE;
    this._query = '';
    this._host = this._setHost(host);
  }

  set https(flag: boolean) {
    this._https = flag;
  }

  set apiVersion(version: API_VER) {
    this._apiVersion = version;
  }

  set method(method: API_METHOD) {
    this._method = method;
  }

  set host(host: string) {
    this._host = this._setHost(host);
  }

  private _isEmptyString(str: string): boolean {
    return !!str || str.length === 0;
  }

  private _setHost(url: string): string {
    return url[url.length - 1] !== '/'
      ? `${url}/${this._apiVersion}/`
      : `${url}/${this._apiVersion}`;
  }

  public useMethod(method: API_METHOD): UrlBuilder {
    this._method = method;
    return this;
  }

  public useQuery(query: string): UrlBuilder {
    this._query = query;
    return this;
  }

  public build(): string {
    let url = '';
    url += this._https ? 'https://' : 'http://';
    url += this._host;
    url += this._method;
    url += this._isEmptyString(this._query) ? `?${this._query}` : '';

    return url;
  }
}
