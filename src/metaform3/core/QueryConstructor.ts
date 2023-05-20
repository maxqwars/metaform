export class QueryConstructor {
  private _db: { [key: string]: unknown } = {};

  protected _add(key: string, value: unknown) {
    this._db[key] = value;
  }

  protected _build(): string {
    return Object.keys(this._db)
      .map((key) => `${key}=${this._db[key]}`)
      .join("&");
  }
}
