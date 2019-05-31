module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      // // ????:
      // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      // sourceType: 'module', // Allows for the use of imports
    },
  },
  rules: {
    '@typescript-eslint/array-type': ['warn', 'generic'], // 'array' -> `T[]` ;  'generic' -> `Array<T>`
    '@typescript-eslint/no-extraneous-class': 'warn',
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Array: {
            message: 'Use Array<any> instead',
            fixWith: 'Array<any>',
          },
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

    // Part of recommended:
    // ------------------------------------------------------
    // "error" just feels too aggressive
    '@typescript-eslint/no-inferrable-types': 'warn',
    // Needs discussion. TypeScript is pretty good at inferring return types
    '@typescript-eslint/explicit-function-return-type': false,
    // '@typescript-eslint/explicit-function-return-type': [ 'warn', { allowTypedFunctionExpressions: true, allowExpressions: true } ],
  },

  overrides: {
    files: ['*.js', '*.jsx'],
    rules: {
      // This seems like a sensible default – to avoid typescript being annoying about
      // node scripts that require require() to function correctly.
      // However, when writing TypeScript this pattern should never be used.
      '@typescript-eslint/no-var-requires': false,
    },
  },
};
