# Change Log

## Upcoming...

- ... <!-- Add new lines here. -->

## 3.0.2

_2020-10-02_

- feat: Set `max_line_length` in `.editorconfig`
- fix: Make Prettier follow `.editorconfig`

## 3.0.0 – 3.0.1

_2020-10-01_

- **BREAKING** feat: Update `pkg.engines.node` version to `^10.12`
- feat: Update all dependencies to latest versions
- feat: Relax `@typescript-eslint/explicit-module-boundary-types`to `off`
- feat: Relax `@typescript-eslint/ban-ts-comment` to a "warning", require
  longer comment
- fix: Invalid `no-use-before-define` behaviour

## 2.6.0

_2020-06-11_

- feat: Add `eslint-plugin-deprecation` and warn on `@deprecated` types

## 2.5.1

_2020-04-22_

- feat: Allow "irregular whitespace" inside template strings

## 2.5.0

_2020-03-15_

- feat: Drop `@typescript-eslint/consistent-type-definitions` – because type
  and interface aren't really interchangable

## 2.4.0

_2020-02-21_

- feat: Add more things to default `tsconfig.json`
- feat: Update optional/peer dependencies to latest versions
- fix: Add missing braces to "format" script example

## 2.3.1

_2019-11-05_

- feat: Update optional/peer dependencies to latest versions
- fix: Pretter option `useTabs` was never set

## 2.3.0

_2019-10-07_

- feat: Add `react/jsx-no-useless-fragment` rule
- feat: Add `@typescript-eslint/consistent-type-definitions` – Was
  `prefer-interface` and part of recommended in v1
- feat: Tighten `quotes` rule and add `template-tag-spacing` rule
- feat: Update optional/peer dependencies to latest versions

## 2.2.0

_2019-09-14_

- feat: Use `@typescript-eslint/consistent-type-assertions` defaults
- fix: Upgrade eslint to 6.4 for overrides path bugfix – (Affecting our
  TypeScript setup.)

## 2.1.0

_2019-09-09_

- feat: Scope all TypeScript linting to just `*.{ts,tsx}` files
- fix: Update `comma-dangle` rule syntax

## 2.0.0

_2019-09-05_

- **BREAKING** feat: Update eslint to version 6 – which does not work in
  Node@6
- feat: Update optional/peer dependencies to latest versions
- feat: Prefer tabs over spaces for indentation
- feat: Add `'no-var': 'warn'` and `no-throw-literal`

## 1.2.0

_2019-08-07_

- feat: Relax `no-use-before-define` to `warn` for all instances
- feat: Relax `@typescript-eslint/no-explicit-any` to `warn` and
  `ignoreRestArgs`
- feat: Relax `@typescript-eslint/no-object-literal-type-assertion` to
  `allowAsParameter`
- fix: Make `@typescript-eslint/indent` the same as core's `indent` value

## 1.1.1

_2019-07-09_

- fix: Make installer check for and install npmjs version of hxmstyle

## 1.1.0

_2019-07-08_

- feat: Tweak rules for async, destructuring and TypeScript

## 1.0.0

_2019-05-31_

- **BREAKING** feat: Change package name to `@hugsmidjan/hxmstyle` – publish
  on npmjs.com
- **BREAKING** feat: Drop support for the `--fantasy` flag – Use
  `parserOptions.ecmaVersion` instead. Added example in the .esintrc.js
  starter.
- feat: Add `root: true` as a default core setting
- feat: Add optional TypeScript support (BYOTS) – (Bring Your Own TypeScript)
- feat: Add some `async/await` rules
- feat: Use the React plugin's native `version: "detect"` feature
- fix: Only use `yarn` for installing if a `yarn.lock` file is found

## 0.2.7

_2019-05-29_

- feat: Add `eslint-plugin-react-hooks` as `--react` dependency
- feat: Update optional/peer dependencies to latest versions
- feat: Remove `no-confusing-arrow` and `no-mixed-operators` rules – as these
  run counter to the opinions of Prettier
- fix: Stop trimming trailing whitespace in markdown files.
- fix: Installer shouldn't error on `pkg.scripts` being undefined.

## 0.2.6

_2019-03-08_

- feat: Allow passing custom project `package.json` path to the eslint
  configger.
- feat: Add option to pass `_guiltily_disable_prettier:false` – to disable
  Prettier's auto-fixing.
- fix: Change ESLint's `indent` level to match Prettier's default.

## 0.2.5

_2019-01-25_

- feat: Auto-set `react.version` setting value from project's `package.json`.
- feat: Improve example "format" script: Prettify `.json` and `.md`.

## 0.2.4

_2018-12-13_

- feat: Change default tabWidth to 2 spaces.

## 0.2.3

_2018-11-30_

- fix: Improve Stylus auto-detection.
- fix: Append newline when writing JSON to .stylintrc and package.json.

## 0.2.2

_2018-11-30_

- feat: Add basic `.editorconfig` with support for
  `__project_specific_rules__`.

## 0.2.1

_2018-11-19_

- feat: Bring back semi-colons (fewer cases of weird).
- feat: Update example "format" script.
- feat: Add prettier config for `*.md` files – for `prettier --write *.md`.

## 0.2.0

_2018-11-18_

- feat: Add prettier with basic experimental config.
- feat: Tweak core rules - partially to match prettier.
- docs: Write short chapter about "format" npm scripts and git hooks.

## 0.1.0

_2018-11-14_

- Initial release, with an install script and basic ESLint and Stylint rules.
