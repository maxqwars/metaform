import { API_ENDPOINT, API_VERSION } from '../constants';

export default class URLBuilder {
  private _useHttps: boolean;
  private _apiVersion: API_VERSION;
  private _endpoint: API_ENDPOINT;
  private _queryString: string;
  private _hostname: string;

  set useHttps(flag: boolean) {
    this._useHttps = flag;
  }

  set apiVersion(version: API_VERSION) {
    this._apiVersion = version;
  }

  set endpoint(endpoint: API_ENDPOINT) {
    this.endpoint = endpoint;
  }

  set queryString(query: string) {
    this._queryString = query;
  }

  set hostname(host: string) {
    this._hostname = host;
  }

  constructor(host: string, version: API_VERSION, useHttps = true) {
    this._useHttps = useHttps;
    this._apiVersion = version;
    this._endpoint = API_ENDPOINT.NONE;
    this._queryString = '';
    this._hostname = this._setHost(host);
  }

  private _setHost(host: string): string {
    return host[host.length - 1] !== '/'
      ? `${host}/${this._apiVersion}`
      : `${host}/${this._apiVersion}`;
  }

  private _isEmptyString(source: string): boolean {
    return !!source || source.length === 0;
  }

  useEndpoint(endpoint: API_ENDPOINT): URLBuilder {
    this._endpoint = endpoint;
    return this;
  }

  setQueryString(queryString: string): URLBuilder {
    this._queryString = queryString;
    return this;
  }

  build(): string | never {
    if (this._endpoint === API_ENDPOINT.NONE) {
      throw Error('FAILED MAKE REQUEST URL, ENDPOINT NOT SELECTED');
    }

    let url = '';

    url += this._useHttps ? 'https://' : 'http://';
    url += this._hostname;
    url += this._endpoint;
    url += this._isEmptyString(this._queryString)
      ? `?${this._queryString}`
      : '';

    return url;
  }
}
