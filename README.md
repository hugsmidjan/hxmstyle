# HXMStyle

The one annoying style to rule them all...

A quick way to maintain unified code-style with minimal faffing, while still allowing project-specific additions and tweaks.


## Install

```
yarn add --dev github:hugsmidjan/hxmstyle
hxmstyle
```

this installs basic, no-frills `eslint` and `prettier` packages, and creates a starter `.eslintrc` file, if needed.

If the installer detects that your project is using stylus, it will install `stylint` and a very opinionated `.stylintrc` file. (Like if you had run `hxmstyle --stylus`)

Similarily if `react` (or `preact` or `inferno`) is detected, a react plugin is installed. (Like if you had run `hxmstyle --react`)

To get linting and formatting for futuristic ES syntax use the `--fantasy`


### Install options

```
hxmstyle --react --fantasy --stylus
```

is the same as

```
hxmstyle --react
hxmstyle --fantasy
hxmstyle --stylus
```

To turn off one or more options pass `false` as a value, like so:

```
hxmstyle --react false --fantasy false --stylus false
```

...or edit `.hxmstylerc.json` and set the corresponding property to `false`.


## Upgrading/Updating

To upgrade the managed packages and plugins to a new version simply do.

```
yarn upgrade hxmstyle
hxmstyle
```


## Adding new plugins and custom rules

Changing the default rules should generally be avoided.

If neccessary simply add those plugins using `yarn`/`npm` and make the neccessary changes to `.eslintrc.js`.



## Removing plugins

The hxmstyle core plugins **can not be changed** without removing HXMLint altogether.

The optional supported plugins (`react`, `fantasy`, `stylint`, etc...) are automatically removed when you run the `hxmstyle` command setting them to `false`.

Other project-specific plugins must be removed manually, using `npm` or `yarn`.


## Example npm scripts

...TODO:...

