import { QueryBuilder } from "../core/QueryBuilder";

export interface IGetFavoritesQueryBuilder {
  session(key?: string): this;
  build(): string;
}

export class GetFavoritesQueryBuilder
  extends QueryBuilder
  implements IGetFavoritesQueryBuilder
{
  session(key?: string | undefined): this {
    if (key) this._add("session", key);
    return this;
  }

  build() {
    return this._build();
  }
}
