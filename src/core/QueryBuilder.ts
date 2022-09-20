export class QueryBuilder {
  private _storage: { [key: string]: unknown } = {};

  protected _add(key: string, value: unknown) {
    this._storage[key] = value;
  }

  protected _build(): string {
    return Object.keys(this._storage)
      .map((key) => `${key}=${this._storage[key]}`)
      .join("&");
  }
}
