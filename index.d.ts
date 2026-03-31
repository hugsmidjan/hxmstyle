import type { Linter } from 'eslint';
import type globals from 'globals';

export { globals };

export type FlatConfig = Linter.Config;

/**
 * Set the path to the package.json file for the project, in case
 * hxmstyle has trouble finding it.
 */
export declare const setPkgJsonPath: (path: string) => void;

export declare const hxmstyleESLint: () => Promise<Array<Linter.Config>>;
