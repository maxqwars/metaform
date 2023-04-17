import { QueryBuilder } from "../core";
import { DESC_FORMAT, PLAYLIST_FORMAT } from "../enums";

export interface IFormatQueryBuilder {
  descriptionFormat(format?: DESC_FORMAT): this;
  playlistFormat(format?: PLAYLIST_FORMAT): this;
  build(): string;
}

export class FormatQueryBuilder extends QueryBuilder {
  descriptionFormat(format?: DESC_FORMAT | undefined): this {
    if (format) this._add("description_type", format);
    return this;
  }
  playlistFormat(format?: PLAYLIST_FORMAT | undefined): this {
    if (format) this._add("playlist_type", format);
    return this;
  }

  build() {
    return this._build();
  }
}
