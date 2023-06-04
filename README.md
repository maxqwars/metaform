<center>
    <img src="https://raw.githubusercontent.com/maxqwars/metaform/main/banner.png" alt="">
</center>

<br>

<center>

![](https://img.shields.io/github/issues/maxqwars/metaform)
![](https://img.shields.io/github/forks/maxqwars/metaform)
![](https://img.shields.io/github/stars/maxqwars/metaform)
![](https://img.shields.io/github/license/maxqwars/metaform)
![](https://img.shields.io/librariesio/dependents/npm/@maxqwars/metaform)
![](https://img.shields.io/github/release-date/maxqwars/metaform)
![](https://img.shields.io/github/contributors/maxqwars/metaform)
![](https://img.shields.io/github/package-json/v/maxqwars/metaform)

</center>

## About

Metaform is an open source library for working with the AniLibria Web API. Developed **without using third-party dependencies** in the production version.
Metaform works in the browser and Nodejs.

Special thanks to the [VK-IO](https://github.com/negezor/vk-io) project that inspired Metaform3

This document has a [translated version in Russian](http://simp.ly/p/crbFMP)

## Reasons to use Metaform

Reasons to use Metaform in your projects

- Open source distributed under a liberal license
- Without binding to third-party libraries and frameworks
- Support for Nodejs and browsers
- 100% original API support
- Simple and intuitive API, similar to the original API

## Installation

### Step 0: Install

> $ npm install @maxqwars/metaform

or install from local

> $ npm install ./path-to-metaform-dir

### For API V3

```javascript
import { metaform3 } from "@maxqwars/metaform/metaform3";
```

### For API V2

```javascript
import { metaform2 } from "@maxqwars/metaform/metaform2";
```

## Metaform in action

You can try out Metaform3 in action on the CodeSandbox website

\* If you are in the Russian territory, use a VPN

[![CODESANDBOX](https://raw.githubusercontent.com/maxqwars/metaform/main/play_in_sandbox.png)]()

## Metaform API

Metaform inherits the name of the original API methods with the HTTP method of the API used.

> Original API endpoint -> GET \<host>/title
>
> Metaform method -> metaform.getTitle()

Detailed information about the available methods can be found in the [repository with the documentation](https://github.com/anilibria/docs) of the original API

## Development workflow

Requirements and instructions for the metaform development process

### Step 1: Check requirements

Metaform is a project written in JS and uses the [Rollup](https://rollupjs.org/) build system. In order to develop metaform you need the latest stable version of the [nodejs](https://nodejs.org/en) runtime and the npm package manager it comes with. [Git](https://git-scm.com/) is required for change management.

### Step 2: Clone code and install dependencies

First, get the current version of the source code

> $ git clone https://github.com/maxqwars/metaform

After that, open the commands window in the folder with the Metaform source code. In Linux you can use the popup menu option, in Windows open the menu with `Shift` pressed.

Afterwards, use the npm package manager to install the dependencies.

> $ npm install

### Step 3: Scripts overview

The assembly of the metaform as well as the maintenance of the code is done with the scripts specified in the `scripts` section of the `packages.json` file. This part lists and describes them.

#### `prebuild`

Executed before the `build` command, it deletes the directory with the previous build

#### `build`

Starts the process of building a ready-to-use version

#### `dev`

Runs rollup in file tracking mode, code is rebuilt after each change in `src` folder

#### `lint`

Analyzes code for errors using ESLint

#### `lint:fix`

Corrects errors found in the code with ESLint

#### `format`

Formats the code following the tailgate, useful when your code editor does not support the Prettier plugin

#### `test`

Launches the unit testing tool Jest

### Step 4: Run you code in playground

-

### Step 5: Push or contribute

-

## Contributing

If you have found a bug, are having difficulty using Metaform, or would like to suggest an improvement, use the contacts below:

- [Developer Telegram (Recommended)](https://t.me/maxqwars)
- [Developer @mail](mailto:maxqwars@gmail.com?subject=Metaform)

## License

MetaForm is an open source library licensed under the [MIT]() license.
