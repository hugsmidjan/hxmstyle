// @ts-check
import { globals, hxmstyleESLint } from '@hugsmidjan/hxmstyle';

/** @type {Promise<Array<import('eslint').Linter.Config>>}   */
export default hxmstyleESLint({ rootDir: import.meta.dirname }).then((hxmstyleConfig) => [
  ...hxmstyleConfig,
  // Place your project-specific additions or overrides here
  // using standard ESLint config syntax...
  {
    ignores: [
      // Add any files or directories to ignore here
      'node_modules',
      'dist',
      'build',
      '.next/**',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
    },
    rules: {
      // Custom overrides:
    },
  },
]);
