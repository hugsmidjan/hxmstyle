// @ts-check
// Prettier options: https://prettier.io/docs/en/options.html

/**
 * @param {import('prettier').Config} userCfg
 * @returns {import('prettier').Config}
 */
export const hxmstylePrettier = (userCfg = {}) => ({
  // // The following should be set in .editorconfig.
  // // Prettier picks them up from there.
  // endOfLine: 'lf',
  // printWidth: 90,
  // tabWidth: 2,
  // useTabs: true,
  // singleQuote: true,
  semi: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  ...userCfg,

  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
    ...(userCfg.overrides || []),
  ],
});
