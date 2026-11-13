// @ts-check
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import globals from 'globals';

export { globals };

/** @typedef {import('eslint').Linter.Config} FlatConfig */
/** @typedef {import('./index.d.ts').HxmstyleOptions} HxmstyleOptions */

const supportedOptions = /** @type {const} */ (['typescript', 'react']);

/** @type {Map<string, Promise<Record<string, unknown>>>} */
const pkgCache = new Map();
/** @type {string | undefined} */
let pkgJsonPath;

/**
 * Set the path to the package.json file for the project, in case
 * hxmstyle has trouble finding it.
 *
 * Normally, you should not need to call this function.
 * Prefer passing `rootDir` (or explicit options) to `hxmstyleESLint()`.
 *
 * @param {string} path
 * @returns {void}
 */
export const setPkgJsonPath = (path) => {
  pkgJsonPath = path;
};

/**
 * @param {string} filePath
 * @returns {Promise<Record<string, unknown>>}
 */
const readPkg = (filePath) => {
  let pkg = pkgCache.get(filePath);
  if (!pkg) {
    pkg = readFile(filePath, 'utf8').then((str) => JSON.parse(str));
    pkgCache.set(filePath, pkg);
  }
  return pkg;
};

/**
 * @param {HxmstyleOptions} opts
 * @param {string} rootDir
 * @returns {Promise<Array<'typescript' | 'react'>>}
 */
const getProjectOptions = async (opts, rootDir) => {
  const needsPkg = supportedOptions.some((name) => opts[name] == null);
  /** @type {Record<string, unknown>} */
  let pkgOptions = {};
  if (needsPkg) {
    const pkg = await readPkg(resolve(rootDir, pkgJsonPath || 'package.json'));
    // @ts-expect-error  (untyped package.json contents)
    pkgOptions = pkg.hxmstyle?.options || {};
  }
  return supportedOptions.filter((name) => opts[name] ?? !!pkgOptions[name]);
};

/**
 * @param {HxmstyleOptions} [opts]
 * @returns {Promise<Array<FlatConfig>>}
 */
export const hxmstyleESLint = async (opts = {}) => {
  const rootDir = resolve(opts.rootDir || process.cwd());
  const options = await getProjectOptions(opts, rootDir);

  const configs = await Promise.all(
    ['core', ...options].map((name) =>
      import(`./configs/${name}.js`).then((mod) => {
        const cfgs = mod.default;
        if (!Array.isArray(cfgs)) {
          throw new Error(`Module ${name} did not export an array of ESLint configs`);
        }
        /** @type {Array<FlatConfig>} */
        const result = [...cfgs];
        if (name === 'typescript') {
          result.push({
            files: mod.TS_FILES,
            languageOptions: { parserOptions: { tsconfigRootDir: rootDir } },
          });
        }
        return result;
      }),
    ),
  );
  return configs.flat();
};
