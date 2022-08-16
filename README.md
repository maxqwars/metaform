# METAFORM

Metaform - the next stage of XConnect development

![](https://img.shields.io/github/issues/maxqwars/metaform)
![](https://img.shields.io/github/forks/maxqwars/metaform)
![](https://img.shields.io/github/stars/maxqwars/metaform)
![](https://img.shields.io/github/license/maxqwars/metaform)
![](https://img.shields.io/librariesio/dependents/npm/@maxqwars/metaform)
![](https://img.shields.io/github/release-date/maxqwars/metaform)
![](https://img.shields.io/github/contributors/maxqwars/metaform)
![](https://img.shields.io/github/package-json/v/maxqwars/metaform)

## What is a metaform?

Metaform is an open library for working with the Anilibria REST API. Reincarnation and reinterpretation of the outdated XConnect project.

### METAFORM VS. XConnect

| Feature            | METAFORM | XConnect |
| ------------------ | -------- | -------- |
| Request timeout    | ✅       | ❌       |
| TypeScript         | ✅       | ✅       |
| `commonJS` support | ✅       | ❌       |
| `UMD` support      | ✅       | ❌       |
| `ESM` support      | ✅       | ✅       |
| Handing API Errors | ✅       | ❌       |
| Modular            | ✅       | ✅       |
| Alive              | ✅       | ❌       |

<br />

## Supported API 🔌

| API             | Status            | Notice                                        |
| --------------- | ----------------- | --------------------------------------------- |
| getTitle        | `Partial` support | A revision of the response parser is required |
| getRandomTitle  | `Partial` support | A revision of the response parser is required |
| getTitles       | Not supported     |                                               |
| getUpdates      | `Partial` support | A revision of the response parser is required |
| getChanges      | Not supported     |                                               |
| getSchedule     | Not supported     |                                               |
| getYouTube      | Not supported     |                                               |
| getFeed         | Not supported     |                                               |
| getYears        | `Full` support    | Ready to use                                  |
| getGenres       | `Full` support    | Ready to use                                  |
| getCachingNodes | Not supported     |                                               |
| getTeam         | Not supported     |                                               |
| getSeedStats    | Not supported     |                                               |
| getRSS          | Not supported     |                                               |
| searchTitles    | `Partial` support | A revision of the response parser is required |
| advancedSearch  | Not supported     |                                               |

<br />

## ⚠️ Risks when using the `alpha` version

The metaform is at an early stage of development and has an unstable API, so it is highly not recommended for writing real projects. I advise you to wait for the first stable release.

### 📦 Installation

```shell
$ npm install @maxqwars/metaform
```

```shell
$ yarn add @maxqwars/metaform
```

<br />
