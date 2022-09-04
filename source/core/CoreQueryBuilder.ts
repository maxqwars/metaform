export default class CoreQueryBuilder {
  private _params: { [key: string]: unknown } = {};

  public get params(): { [key: string]: unknown } {
    return this._params;
  }

  public set params(value: { [key: string]: unknown }) {
    this._params = value;
  }

  protected addQuery(key: string, value: unknown): void {
    this._params[key] = value;
  }

  protected build(): string {
    return Object.keys(this._params)
      .map(key => `${key}=${this._params[key]}`)
      .join('&');
  }
}
