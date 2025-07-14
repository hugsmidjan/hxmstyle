// @ts-check
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import globals from 'globals';

export { globals };

/** @typedef {import('eslint').Linter.Config} FlatConfig */

const supportedOptions = new Set(['typescript', 'react']);

let _pkg;
let pkgJsonPath = 'package.json';
/**
 * Set the path to the package.json file for the project, in case
 * hxmstyle has trouble finding it.
 *
 * Normally, you should not need to call this function.
 *
 * @param {string} path
 * @returns {void}
 */
export const setPkgJsonPath = (path) => {
  pkgJsonPath = pkgJsonPath || path;
};

const getProjectOptions = async () => {
  if (!_pkg) {
    _pkg = await readFile(resolve(process.cwd(), pkgJsonPath))
      .then((buffer) => JSON.parse(buffer.toString()));
  }
  const options = (_pkg.hxmstyle || {}).options || {};
  return Object.keys(options)
    .filter((name) => supportedOptions.has(name));
};

const getConfigs = async () => {
  const importedConfigs = ['core', ...(await getProjectOptions())]
    .map((name) =>
      import(`./configs/${name}.js`).then((mod) => {
        const cfgs = mod.default;
        if (!Array.isArray(cfgs)) {
          throw new Error(`Module ${name} did not export an array of ESLint configs`);
        }
        return /** @type {FlatConfig} */ (cfgs);
      })
    );
  return Promise.all(importedConfigs).then((configs) => configs.flat());
};

export const hxmstyleESLint = async () =>  [
  ...await getConfigs(),
];
