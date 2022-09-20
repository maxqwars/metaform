import { QueryBuilder } from "../core";
import { RAW_RESOURCE, DESC_FORMAT, PLAYLIST_FORMAT } from "../enums";

export interface IGetReleaseQueryBuilder {
  build(): string;
  id(id?: number): this;
  code(code?: string): this;
  filter(keys?: string[]): this;
  remove(keys?: string[]): this;
  include(resources?: RAW_RESOURCE[]): this;
  torrentId(id?: number): this;
  descriptionFormat(format?: DESC_FORMAT): this;
  playlistFormat(format?: PLAYLIST_FORMAT): this;
}

export class GetReleaseQueryBuilder
  extends QueryBuilder
  implements IGetReleaseQueryBuilder
{
  id(id?: number): this {
    if (id) this._add("id", id);
    return this;
  }

  code(code?: string): this {
    if (code) this._add("code", code);
    return this;
  }

  filter(keys?: string[]): this {
    if (keys) this._add("filter", keys);
    return this;
  }

  remove(keys?: string[]): this {
    if (keys) this._add("remove", keys);
    return this;
  }

  include(resources?: RAW_RESOURCE[]): this {
    if (resources) this._add("include", resources);
    return this;
  }

  torrentId(id?: number): this {
    if (id) this._add("torrent_id", id);
    return this;
  }

  descriptionFormat(format?: DESC_FORMAT): this {
    if (format) this._add("description_type", format);
    return this;
  }

  playlistFormat(format?: PLAYLIST_FORMAT): this {
    if (format) this._add("playlist_type", format);
    return this;
  }

  build() {
    return this._build();
  }
}
