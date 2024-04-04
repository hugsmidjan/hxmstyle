// @ts-check
// import reactPlugin from 'eslint-plugin-react'; // autoimported by the recommended config
// import reactHooksPlugin from 'eslint-plugin-react-hooks';
// import reactRecommended from 'eslint-plugin-react/configs/recommended'; // <-- Will work with v8 of the plugin
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

/** @type {Array<import('eslint').Linter.FlatConfig>} */
export default [
  reactRecommended,
  {
    plugins: {
      /* Issue: https://github.com/facebook/react/issues/28313 */
      // 'react-hooks': reactHooksPlugin,
    },

    rules: {
      // https://www.npmjs.com/package/eslint-plugin-react
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': ['off'],
      'react/no-unknown-property': ['warn'], // warns about class="" and lowercase event-attrs (e.g. onclick="") etc...
      'react/no-unescaped-entities': ['warn', { forbid: ['>', '}'] }],
      'react/no-deprecated': ['warn'],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/self-closing-comp': ['warn'],
      'react/display-name': ['off' /*, { ignoreTranspilerName: true }*/],
      'react/button-has-type': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never', propElementValues: 'always' },
      ],

      /*
      // https://www.npmjs.com/package/eslint-plugin-react-hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      */
    },
  },
];
