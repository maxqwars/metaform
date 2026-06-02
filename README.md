![](banner.png)

# What is Metaform?

Metaform is a lightweight, platform-agnostic, open-source TypeScript library designed for flexible and strictly typed interaction with the AniLiberty Web API.

![](https://img.shields.io/github/issues/maxqwars/metaform)
![](https://img.shields.io/github/forks/maxqwars/metaform)
![](https://img.shields.io/github/stars/maxqwars/metaform)
![](https://img.shields.io/github/license/maxqwars/metaform)
![](https://img.shields.io/librariesio/dependents/npm/@maxqwars/metaform)
![](https://img.shields.io/github/release-date/maxqwars/metaform)
![](https://img.shields.io/github/contributors/maxqwars/metaform)
![](https://img.shields.io/github/package-json/v/maxqwars/metaform)

Version **2.0** introduces a complete architectural overhaul focused on performance, modularity, and strict type safety:

- **Functional Architecture & Tree-shaking:** We have completely migrated away from a monolithic class implementing all API methods. Now, every endpoint is an independent function. If you only use 2 out of 20 methods, the rest will not be included in your final production bundle.
- **Runtime Agnosticism (Zero-dependency Transport):** Built-in `fetch` has been completely removed from the library core. Network interaction is now decoupled via a generic `Transport` interface. You can use native `fetch`, `axios`, or even read data from a local cache—all it takes is implementing a simple interface.
- **Type Guards & Declarative Validation:** The overhauled type system combined with strict Type Guards ensures data validity before it ever reaches your application's business logic.

# Quick Start

Here is an example of using independent functions and the built-in fetch transport to retrieve a list of teams:

```typescript
import { createFetchTransport } from '@maxqwars/metaform/transport/fetch-transport'
import { getTeams } from '@maxqwars/metaform/get-teams'

async function main() {
  // Initialize the transport by specifying the base API URL
  const transport = createFetchTransport(
    '[https://aniliberty.top/api/v1](https://aniliberty.top/api/v1)',
  )

  // Invoke the isolated request function, passing the transport instance
  const teams = await getTeams(transport, 'v1', {
    include: ['id', 'title'],
  })

  console.log(teams)
}

main().catch(console.error)
```

# Advantages of the New Architecture

### 1. Custom Transports Without Modifying Source Code

By decoupling request preparation from its execution, you gain full control over the network layer. This means you can:

- Use **Axios** by writing a simple `Transport` wrapper around it.
- Write tests easily by passing a mock transport that reads data from the file system or returns hardcoded values.
- Embed the library into any environment supporting JavaScript execution.
- Stay unrestricted—the library only expects data to be returned in the correct format.

### 2. Maximum Bundle Optimization

Previously, Metaform was architecturally structured as a single large class implementing API methods. Now, it consists of an extensive set of highly configurable functions that work seamlessly with the tree-shaking capabilities of modern bundlers.

### 3. Type Safety at Data Boundaries

The new type system is built on the principle of strict validation. Combining declarative mapping with Type Guards allows you to catch mismatches in the API response structure at compile time or upon entering the transport, protecting your application from `undefined` errors at runtime.

# License

Metaform is open-source software licensed under the MIT License. Feel free to use it in any of your projects.
