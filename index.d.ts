import type { Linter } from 'eslint';
import type globals from 'globals';

export { globals };

export type FlatConfig = Linter.Config;

export type HxmstyleOptions = {
  /**
   * Enable the React config. Defaults to `hxmstyle.options.react` in the
   * project's `package.json`.
   */
  react?: boolean;
  /**
   * Enable the TypeScript config. Defaults to `hxmstyle.options.typescript`
   * in the project's `package.json`.
   */
  typescript?: boolean;
  /**
   * The project's root directory. Used to locate `package.json` and as
   * `tsconfigRootDir` for typescript-eslint.
   *
   * Defaults to `process.cwd()`. Pass `import.meta.dirname` from your
   * `eslint.config.js` to make linting independent of the working directory
   * (e.g. when run from an editor or a monorepo root).
   */
  rootDir?: string;
};

/**
 * Set the path to the package.json file for the project, in case
 * hxmstyle has trouble finding it. (Resolved relative to `rootDir`.)
 */
export declare const setPkgJsonPath: (path: string) => void;

export declare const hxmstyleESLint: (
  options?: HxmstyleOptions,
) => Promise<Array<Linter.Config>>;
