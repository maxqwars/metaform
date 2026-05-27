![](banner.png)

# Stats 🏋️

![](https://img.shields.io/github/issues/maxqwars/metaform)
![](https://img.shields.io/github/forks/maxqwars/metaform)
![](https://img.shields.io/github/stars/maxqwars/metaform)
![](https://img.shields.io/github/license/maxqwars/metaform)
![](https://img.shields.io/librariesio/dependents/npm/@maxqwars/metaform)
![](https://img.shields.io/github/release-date/maxqwars/metaform)
![](https://img.shields.io/github/contributors/maxqwars/metaform)
![](https://img.shields.io/github/package-json/v/maxqwars/metaform)
![](https://socket.dev/api/badge/npm/package/@maxqwars/metaform/1.0.0#1687019298800)
[![](https://data.jsdelivr.com/v1/package/npm/@maxqwars/metaform/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@maxqwars/metaform)

</center>

# About METAFORM/V2

Metaform is an open source library for working with the AniLibria Web API. Developed **without using third-party dependencies** in the production version.
Metaform works in the browser and Nodejs (upd: works in **any** javascript runtime).

# Quick start

## Fetch teams list example

```typescript
import { createFetchTransport } from '@maxqwars/metaform/transport/fetch-transport'
import { getTeams } from '@maxqwars/metaform/api/functions/get-teams'

async function main() {
  const transport = createFetchTransport('https://aniliberty.top/api/v1')

  const teams = await getTeams(transport, 'v1', {
    include: ['id', 'title'],
  })

  console.log(teams)
}

main().catch(console.error)
```

# Differences from metaform versions (2/3)

## Legacy Anilibria API removed

A lot of time has passed since the creation of this project, the original API for which it was created is more unreliable due to reasons beyond the control of metaform. Therefore, compatibility with the original API has been completely removed, perhaps it will be added if necessary and called `metaform-legacy`.

## Now without `fetch`

The new version removes the use of fetch built into nodejs or browser. Now you determine the data transport yourself, the fetch transport is already in the library, and you write the rest yourself. Using the `Transport` interface.

## Tree-shaking is now working.

Previously, Metaform was architecturally structured as a single large class implementing API methods; now, however, it consists of an extensive set of highly configurable functions that work seamlessly with the tree-shaking capabilities of modern bundlers.

# License

Metaform is an open source library licensed under the [MIT]() license.
