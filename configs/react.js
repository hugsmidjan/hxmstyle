// These plugins don't have typescript support yet, so we can't use them in the typescript config.
// // @ts-check

// Based on: https://github.com/facebook/react/issues/28313#issuecomment-2530821315

import reactPlugin from 'eslint-plugin-react'; // autoimported by the recommended config
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/** @type {Array<import('eslint').Linter.Config>} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
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
      'react/jsx-no-leaked-render': 'error',
      'react/no-array-index-key': 'warn',
      'react/jsx-pascal-case': 'warn',

      // https://www.npmjs.com/package/eslint-plugin-react-hooks
      ...reactHooksPlugin.configs.recommended.rules,

      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
      ...jsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/media-has-caption': 0,
    },
  },
];
