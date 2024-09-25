const coreRules = require('./core').rules;

module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
          // // ????:
          // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
          // sourceType: 'module', // Allows for the use of imports
        },
      },
      plugins: ['deprecation', 'total-functions'],
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
        'no-unused-expressions': 'off', // Note: you must disable the base rule as it can report incorrect errors
        '@typescript-eslint/no-unused-expressions': coreRules['no-unused-expressions'],
        '@typescript-eslint/no-restricted-types': [
          'warn',
          {
            types: {
              Object: {
                message: 'Use {} instead',
                fixWith: '{}',
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

        'deprecation/deprecation': 'warn',

        // Part of recommended:
        // ------------------------------------------------------
        '@typescript-eslint/ban-ts-ignore': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
        // note you must disable the base rule as it can report incorrect errors
        'no-use-before-define': 'off',
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
  ],
};
