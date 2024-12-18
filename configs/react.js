// These plugins don't have typescript support yet, so we can't use them in the typescript config.
// // @ts-check

// Based on: https://github.com/facebook/react/issues/28313#issuecomment-2530821315

import reactPlugin from 'eslint-plugin-react'; // autoimported by the recommended config
import reactHooksPlugin from 'eslint-plugin-react-hooks';

/** @type {Array<import('eslint').Linter.Config>} */
export default [
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
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

      // https://www.npmjs.com/package/eslint-plugin-react-hooks
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
];
