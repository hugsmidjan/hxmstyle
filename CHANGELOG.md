# Change Log

## Upcoming...

<!-- Add new lines here. Version number will be decided later -->

- ...
- feat: Remove `no-confusing-arrow` rule.
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
