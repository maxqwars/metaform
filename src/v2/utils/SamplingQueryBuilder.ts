import { QueryBuilder } from "../core";
import { RAW_RESOURCE } from "../enums";

export interface ISamplingQueryBuilder {
  filter(keys?: string[]): this;
  include(res?: RAW_RESOURCE[]): this;
  remove(keys?: string[]): this;
  build(): string;
}

export class SamplingQueryBuilder
  extends QueryBuilder
  implements ISamplingQueryBuilder
{
  filter(keys?: string[] | undefined): this {
    if (keys) this._add("filter", keys);
    return this;
  }
  include(res?: RAW_RESOURCE[] | undefined): this {
    if (res) this._add("include", res);
    return this;
  }
  remove(keys?: string[] | undefined): this {
    if (keys) this._add("remove", keys);
    return this;
  }

  build() {
    return this._build();
  }
}
