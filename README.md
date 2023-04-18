<center>
    <img src="https://raw.githubusercontent.com/maxqwars/metaform/main/banner.png" alt="">
</center>

<br>

<center>

![](https://img.shields.io/github/issues/the-north-syndicate/metaform)
![](https://img.shields.io/github/forks/the-north-syndicate/metaform)
![](https://img.shields.io/github/stars/the-north-syndicate/metaform)
![](https://img.shields.io/github/license/the-north-syndicate/metaform)
![](https://img.shields.io/librariesio/dependents/npm/@tns/metaform)
![](https://img.shields.io/github/release-date/the-north-syndicate/metaform)
![](https://img.shields.io/github/contributors/the-north-syndicate/metaform)
![](https://img.shields.io/github/package-json/v/the-north-syndicate/metaform)

</center>

## About

Metaform is an open source library for working with the AniLibria Web API. Developed **without using third-party dependencies** in the production version.
Metaform works in the browser and Nodejs.

This document has a [translated version in Russian](http://simp.ly/p/crbFMP)

## Usage

Install metaform from npm

> npm install @tns/metaform

or install from local

> npm install ./path-to-metaform-dir

## Development workflow

Requirements and instructions for the metaform development process

### Step 1: Check requirements

Metaform is a project written in JS and uses the [Rollup](https://rollupjs.org/) build system. In order to develop metaform you need the latest stable version of the [nodejs](https://nodejs.org/en) runtime and the npm package manager it comes with. [Git](https://git-scm.com/) is required for change management.

### Step 2: Clone code and install dependencies

First, get the current version of the source code

> $ git clone https://github.com/the-north-syndicate/metaform

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

-

## License

MetaForm is an open source library licensed under the MIT license.
