// @ts-check

// Prettier options: https://prettier.io/docs/en/options.html

/** @type {import('prettier').Config} baseRules */
const baseRules = {
  // // The following should be set in .editorconfig
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

  overrides: [
    {
      // files: '*.test.js',
      files: '.stylusrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
  ],
};

module.exports = (userCfg = {}) => {
  const overrides = baseRules.overrides?.concat(userCfg.overrides || []);
  return Object.assign({}, baseRules, userCfg, { overrides });
};
