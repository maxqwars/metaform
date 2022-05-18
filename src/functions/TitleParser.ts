// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// TODO: Add array playlist support

import {
  Title,
  RawTitle,
  TitleType,
  TitleTeam,
  TitleNames,
  TitleSeason,
  TitleStatus,
  TitlePosters,
  TitleBlocked,
  TitlePlayer,
  ObjectPlaylist,
  TitleSeries,
} from '../typings';

/* eslint-disable no-extra-boolean-cast */

export default function TitleParser(data: RawTitle): Title {
  const names: TitleNames | null = ((): TitleNames | null => {
    if (!!data.names) {
      return {
        ru: !!data.names.ru ? data.names.ru : null,
        en: !!data.names.en ? data.names.en : null,
        alternative: !!data.names.alternative ? data.names.alternative : null,
      };
    }
    return null;
  })();

  const status: TitleStatus | null = ((): TitleStatus | null => {
    if (!!data.status) {
      return {
        string: !!data.status.string ? data.status.string : null,
        code: !!data.status.code ? data.status.code : null,
      };
    }
    return null;
  })();

  const posters: TitlePosters | null = ((): TitlePosters | null => {
    if (!!data.posters) {
      return {
        small: !!data.posters.small
          ? {
              url: !!data.posters.small.url ? data.posters.small.url : null,
              rawBase64File: !!data.posters.small.raw_base64_file
                ? data.posters.small.raw_base64_file
                : null,
            }
          : null,
        medium: !!data.posters.medium
          ? {
              url: !!data.posters.medium.url ? data.posters.medium.url : null,
              rawBase64File: !!data.posters.medium.raw_base64_file
                ? data.posters.medium.raw_base64_file
                : null,
            }
          : null,
        original: !!data.posters.original
          ? {
              url: !!data.posters.original.url
                ? data.posters.original.url
                : null,
              rawBase64File: !!data.posters.original.raw_base64_file
                ? data.posters.original.raw_base64_file
                : null,
            }
          : null,
      };
    }
    return null;
  })();

  const type: TitleType | null = ((): TitleType | null => {
    if (!!data.type) {
      return {
        fullString: !!data.type.full_string ? data.type.full_string : null,
        code: !!data.type.code ? data.type.code : null,
        string: !!data.type.string ? data.type.string : null,
        series: !!data.type.series ? data.type.series : null,
        length: !!data.type.length ? data.type.length : null,
      };
    }
    return null;
  })();

  const team: TitleTeam | null = ((): TitleTeam | null => {
    if (!!data.team) {
      return {
        voice: !!data.team.voice ? data.team.voice : null,
        translator: !!data.team.translator ? data.team.translator : null,
        editing: !!data.team.editing ? data.team.editing : null,
        decor: !!data.team.decor ? data.team.decor : null,
        timing: !!data.team.timing ? data.team.timing : null,
      };
    }
    return null;
  })();

  const season: TitleSeason | null = ((): TitleSeason | null => {
    if (!!data.season) {
      return {
        string: !!data.season.string ? data.season.string : null,
        code: !!data.season.code ? data.season.code : null,
        year: !!data.season.year ? data.season.year : null,
        weekDay: !!data.season.week_day ? data.season.week_day : null,
      };
    }
    return null;
  })();

  const blocked: TitleBlocked | null = ((): TitleBlocked | null => {
    if (!!data.blocked) {
      return {
        blocked:
          typeof data.blocked.blocked !== 'undefined'
            ? data.blocked.blocked
            : null,
        bakanim:
          typeof data.blocked.bakanim !== 'undefined'
            ? data.blocked.bakanim
            : null,
      };
    }
    return null;
  })();

  const player: TitlePlayer | null = ((): TitlePlayer | null => {
    if (!!data.player) {
      const playlist: ObjectPlaylist = {};

      if (!!data.player.playlist) {
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const index in data.player.playlist) {
          const episode = data.player.playlist[index];
          playlist[index] = {
            serie: !!episode.serie ? episode.serie : null,
            createdTimestamp: !!episode.created_timestamp
              ? episode.created_timestamp
              : null,
            preview: null,
            skips: {
              opening: null,
              ending: null,
            },
            hls: {
              fhd: !!episode.hls?.fhd ? episode.hls?.fhd : null,
              hd: !!episode.hls?.hd ? episode.hls?.hd : null,
              sd: !!episode.hls?.sd ? episode.hls?.sd : null,
            },
          };
        }
      }

      const series: TitleSeries | null = {
        first: !!data.player.series?.first ? data.player.series?.first : null,
        last: !!data.player.series?.last ? data.player.series?.last : null,
        string: !!data.player.series?.string
          ? data.player.series?.string
          : null,
      };

      return {
        alternativePlayer: !!data.player.alternative_player
          ? data.player.alternative_player
          : null,
        host: !!data.player.host ? data.player.host : null,
        series,
        playlist,
      };
    }
    return null;
  })();

  return {
    /* Primitive */
    id: !!data.id ? data.id : null,
    code: !!data.code ? data.code : null,
    description: !!data.description ? data.description : null,
    genres: !!data.genres ? data.genres : null,
    inFavorites: !!data.in_favorites ? data.in_favorites : null,
    lastChange: !!data.last_change ? data.last_change : null,
    updated: !!data.updated ? data.updated : null,
    /*  */
    names,
    status,
    posters,
    type,
    team,
    season,
    blocked,
    player,
  };
}
