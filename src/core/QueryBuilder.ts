export class QueryBuilder {
  private _storage: { [key: string]: unknown } = {};

  protected add<T>(key: string, value: T) {
    this._storage[key] = value;
  }

  protected build(): string {
    return Object.keys(this._storage)
      .map((key) => `${key}=${this._storage[key]}`)
      .join("&");
  }
}
