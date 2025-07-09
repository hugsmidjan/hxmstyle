// @ts-check
import coreRules from './core';
import tseslint from 'typescript-eslint';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {Array<import('eslint').Linter.Config>} */
export default [
  ...(/** @type {Array<import('eslint').Linter.Config>} */ (tseslint.configs.recommendedTypeChecked)),
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
        // ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/interface-name-prefix': 'off', // 'never' | 'always // 'never' seems like a weird default
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/array-type': ['warn', { default: 'generic' }], // 'array' -> `T[]` ;  'generic' -> `Array<T>`
      '@typescript-eslint/no-extraneous-class': 'warn',
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/ban-types': [
        'warn',
        {
          types: {
            Object: {
              message: 'Use object instead',
              fixWith: 'object',
            },
            String: {
              message: 'Use string instead',
              fixWith: 'string',
            },
            Number: {
              message: 'Use number instead',
              fixWith: 'number',
            },
            Boolean: {
              message: 'Use boolean instead',
              fixWith: 'boolean',
            },
          },
        },
      ],

      'prefer-const': coreRules['prefer-const'], // the typescript-eslint plugin somehow switch this rule to "error"
      'no-unused-vars': 'off', // note you must disable the base rule as it can report incorrect errors
      '@typescript-eslint/no-unused-vars': coreRules['no-unused-vars'],

      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],

      '@typescript-eslint/no-deprecated': 'warn',


      // Part of recommended:
      // ------------------------------------------------------
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-explicit-any': [
        'error',
        { fixToUnknown: false, ignoreRestArgs: true },
      ],
      '@typescript-eslint/indent': ['error', 2],
      // "error" just feels too aggressive
      '@typescript-eslint/no-inferrable-types': 'warn',
      // Needs discussion. TypeScript is pretty good at inferring return types
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // // Consider using this setting:
      // '@typescript-eslint/explicit-module-boundary-types': ['warn', { allowArgumentsExplicitlyTypedAsAny: true }],

      '@typescript-eslint/ban-ts-comment': ['warn', { minimumDescriptionLength: 12 }],

      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/consistent-type-exports': 'error',

      '@typescript-eslint/no-unsafe-member-access': 'warn',

      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowDestructuring: true, // Allow `const { props, state } = this`; false by default
          allowedNames: ['_this'], // Allow `const self = this`; `[]` by default
        },
      ],
    },
  },
];
