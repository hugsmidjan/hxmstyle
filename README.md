# HXMstyle

The one annoying style to rule them all...

A quick way to maintain unified code-style with minimal faffing, while still
allowing project-specific additions and tweaks.

## Install

```
npx @hugsmidjan/hxmstyle [--optionflags]
```

this installs the `hxmstyle` linting/formatting ruleset, adds the neccessary
basic, no-frills `eslint` and `prettier` dependencies to your project, and
creates a starter [`.eslintrc`](starters/eslintrc.js),
[`.prettierrc`](starters/prettierrc.js) and
[`.editorconfig`](starters/editorconfig.cfg) files, if needed.

It also adds the handy CLI command `hxmstyle` that helps you update your
plugins and add/remove optional preset bundles.

If the installer detects that your project is using TypeScript, it installs
the relevant TS plugins and a minimal `tsconfig.json` file with
`compilerOptions.strict: true`. (As if you'd run `hxmstyle --typescript`)

If the installer detects that your project is using stylus, it will install
`stylint` and a very opinionated [`.stylintrc`](starters/stylintrc.js) file.
(Just like if you'd run `hxmstyle --stylus`)

Similarily if `react` (or `preact` or `inferno`) is detected, a react plugin
is installed. (As if you'd run `hxmstyle --react`)

### Install options

Both the `npx` installer and the local CLI command take one or more optional
flags.

```
hxmstyle --react --stylus --typescript
```

is the same as

```
hxmstyle --react
hxmstyle --stylus
hxmstyle --typescript
```

To turn off one or more options pass `false` as a value, like so:

```
hxmstyle --react=false --stylus=false --typescript=false
```

...or edit your `package.json`'s `hxmstyle.options` field and set the
corresponding property to `false`.

## Upgrading/Updating

To upgrade the managed packages and plugins to a new version simply do.

```
yarn upgrade hxmstyle
hxmstyle
```

## Adding new plugins and custom rules

Changing the default rules should generally be avoided.

If neccessary simply add those plugins using `yarn`/`npm` and make the
neccessary changes to `.eslintrc.js`, `.prettierrc.js` and/or `.stylintrc`.

If one of your `.*rc` files goes missing or gets corrupted, you can find fresh
ones [in the "starters" directory](starters/).

## Removing plugins

The hxmstyle core plugins **can not be changed** without breaking hxmstyle. If
your project can't use the core plugins, then don't use hxmstyle.

Hxmstyle does **not** uninstall or remove plugins if you change an options
flag to `false`, and not even if hxmstyle changes its mind about which plugins
to install. The old plugins must be garbage-colleced manually, using `npm` or
`yarn`.

(This policy prevents hxmstyle from accidentally removing plugins that you
might have installed yourself for some reason.)

However, `packgage.json` always contains an updated list of
`hxmstyle.dependencies` that you can consult when tidying up your
devDependencies.

## Example npm scripts

Consider adding an npm script similar to this one to your project's
`package.json`:

```json
    "scripts": {
        "format": "eslint --fix  \"*.{js,ts,tsx}\" \"_src/**/*.{js,ts,tsx}\"  &&  prettier --write \"*.md\" \"*.json\"",
    }
```

(See the documentation on
[ESLint's Command Line Interface](https://eslint.org/docs/user-guide/command-line-interface)
for more info.)

This script can be run as part of npm
[`prepublishOnly` script](https://docs.npmjs.com/misc/scripts), or added as a
[`pre-push` git hook](https://www.atlassian.com/git/tutorials/git-hooks) for
your project.

## VSCode setup

Add these plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  – for files other than JavaScript/TypeScript (Markdown, JSON, HTML, etc.)
- [Stylint](https://marketplace.visualstudio.com/items?itemName=HaaLeo.vscode-stylint)
  – if you're writing Stylus code

...and these settings:

```js
    // Essentials
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      { "language": "typescript", "autoFix": true },
      { "language": "typescriptreact", "autoFix": true }
    ],
    // NOTE: This one might be best set on a per-workspace basis:
    "editor.formatOnSave": true,

    // ....
    "stylint.packageManager": "yarn", // or "npm"
    "eslint.packageManager": "yarn", // or "npm"
```

...and make sure that the project root (where `.eslintrc.js` and
`package.json` are) is set up as a "workspace folder". Otherwise add its path
to your workspace settings:

```json
"eslint.workingDirectories": [
    "path/to/project/root"
],
"stylint.workingDirectories": [
    "path/to/project/root"
],
```

## Advanced Options

The `hxmstyle`'s core eslint config module accepts a second `options`
parameter. The supported options are:

- `pkg`: The project's `package.json` contents. Useful when your editor is
  having trouble auto-resolving the project root.
- `_guiltily_disable_prettier`: A value of `true` will turn off ESLint's
  Prettier "auto-fixes". This is sometimes neccessary when working with large
  existing malformatted code-bases.

```
module.exprts = require('@hugsmidjan/hxmgulp)(
  {
    // custom eslint config...
  }
  {
    pkg: require('./package.json'),
    _guiltily_disable_prettier: true,
  }
)
```
