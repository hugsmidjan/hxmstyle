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
    // https://github.com/prettier/eslint-config-prettier/blob/master/index.js
    'prettier',
  ],
  rules: reInserts,
};
