const coreRules = require('./core').rules;

// Override eslint-config-prettier for certain rules
// this allows us to discourage certain idioms that
// prettier tolerates but does not require.
const reInserts = {};
['curly'].forEach((key) => {
  reInserts[key] = coreRules[key];
});

module.exports = {
  extends: [
    'plugin:prettier/recommended',
    // https://github.com/prettier/eslint-config-prettier/blob/master/index.js
    'prettier',
  ],
  plugins: ['prettier'],
  rules: Object.assign(
    {
      'prettier/prettier': 'warn',
    },
    reInserts
  ),
};
