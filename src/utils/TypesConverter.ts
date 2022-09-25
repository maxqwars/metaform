import { Title, Release } from "../types";

export class TypesConverter {
  static titleToRelease(title: Title): Release {
    const {
      id,
      code,
      description,
      genres,
      in_favorites,
      last_change,
      updated,
      names,
      status,
      posters,
      type,
      team,
      season,
      blocked,
      player,
    } = title;

    return {
      id,
      code,
      description,
      genresList: genres,
      inFavorites: in_favorites,
      lastChange: last_change,
      updated,
    };
  }
}
