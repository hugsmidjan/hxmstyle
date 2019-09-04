// Prettier options: https://prettier.io/docs/en/options.html
const baseRules = {
  printWidth: 90,
  tabWidth: 2,
  tabs: true,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',

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
        printWidth: 78,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{css,scss,less,styl}',
      options: {
        tabWidth: 4,
      },
    },
  ],
};

module.exports = (userCfg = {}) => {
  const overrides = baseRules.overrides.concat(userCfg.overrides || []);
  return Object.assign({}, baseRules, userCfg, { overrides });
};
