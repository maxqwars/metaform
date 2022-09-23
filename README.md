<center>
    <img src="https://github.com/maxqwars/metaform/raw/V2/banner.png" alt="">
</center>

<br>

![](https://img.shields.io/github/issues/maxqwars/metaform)
![](https://img.shields.io/github/forks/maxqwars/metaform)
![](https://img.shields.io/github/stars/maxqwars/metaform)
![](https://img.shields.io/github/license/maxqwars/metaform)
![](https://img.shields.io/librariesio/dependents/npm/@maxqwars/metaform)
![](https://img.shields.io/github/release-date/maxqwars/metaform)
![](https://img.shields.io/github/contributors/maxqwars/metaform)
![](https://img.shields.io/github/package-json/v/maxqwars/metaform)

## 📦 Installation

```shell
$ npm install @maxqwars/metaform
```

```shell
$ yarn add @maxqwars/metaform
```

## 🧬 Structure of the metaform

### Core

Core - a set of entities for building URLs to API endpoints, queries and data parsing you do yourself

### Modules

Modules - is a set of classes that implements the API methods, including requesting and processing data. The names of the methods do not correspond to the original API methods. To work in the NodeJS environment you will need to use cross-fetch or its equivalent.

### Utils

Useful utilities for working with API: query builders, format converters, etc.

## API Coverage

State of supported API methods

| method          | status | module       | name             |
| --------------- | ------ | ------------ | ---------------- |
| getTitle        | x      | MetaDatabase | get              |
| getTitles       | x      | MetaDatabase | getFromList      |
| getUpdates      | x      | MetaDatabase | getUpdates       |
| getChanges      | x      | MetaDatabase | getChanged       |
| getGenres       | x      | MetaDatabase | getGenresList    |
| getRandomTitle  | x      | MetaDatabase | getRandomRelease |
| getYears        | x      | MetaDatabase | getYearsList     |
| searchTitles    | x      | MetaDatabase | find             |
| advancedSearch  | x      | MetaDatabase | search           |
| login           | x      | MetaUser     | login            |
| logout          | x      | MetaUser     | logout           |
| getFavorites    | x      | MetaUser     | getFavorites     |
| addFavorites    | x      | MetaUser     | addFavorites     |
| delFavorites    | x      | MetaUser     | delFavorites     |
| getTeam         | x      | MetaAbout    | getTeam          |
| getCachingNodes | x      | MetaService  | getCachingNodes  |
| getSeedStats    | x      | MetaService  | getSeedStats     |
| getSchedule     | x      | MetaFeed     | getSchedule      |
| getYoutube      | x      | MetaFeed     | getYoutube       |
| getFeed         | x      | MetaFeed     | getFeed          |
| getRSS          | x      | MetaFeed     | getRSS           |

## ✨ Examples of use

### Getting release data using the MetaDatabase module

```typescript
import { Modules, Constants } from "@maxqwars/metaform";

const id = 0; // release id

const database = new Modules.MetaDatabase({
  host: "api.anilibria.tv",
  version: Constants.API_VER.V2,
  // timeout: default 6000ms
  // useHttps: default `true`
});

database
  .get({ id })
  .then((release) => console.log(release))
  .catch((e) => console.error(e));
```

### Getting release data using Core modules

```typescript
import { Constants, Core } from "@maxqwars/metaform";

const id = 0; // release id

const urlBuilder = new Core.UrlBuilder({
  host: "api.anilibria.tv",
  useHttps: true,
});
const queryBuilder = new Core.GetTitleQueryBuilder();

queryBuilder.setId(id);

const reqUrl = urlBuilder
  .setMethod(Constants.API_METHOD.GET_TITLE)
  .setQuery(queryBuilder.build())
  .build();

// Retrieve data in any convenient way using the collected Url
```

## License

MetaForm is an open source library licensed under the MIT license.
