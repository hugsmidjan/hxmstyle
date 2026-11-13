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
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
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
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
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
      // The React Compiler-based rules in `configs.recommended` (`purity`,
      // `refs`, `static-components`, etc.) add ~20% to lint time and are
      // skipped, except for `set-state-in-effect` which is cheap on its own
      // (~6%) and catches common "You Might Not Need an Effect" mistakes.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn',

      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
      ...jsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/media-has-caption': 0,
    },
  },
];
