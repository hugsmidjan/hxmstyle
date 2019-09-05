module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      // // ????:
      // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      // sourceType: 'module', // Allows for the use of imports
    },
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': false,
    '@typescript-eslint/camelcase': false,
    '@typescript-eslint/interface-name-prefix': false, // 'never' | 'always // 'never' seems like a weird default
    '@typescript-eslint/array-type': ['warn', 'generic'], // 'array' -> `T[]` ;  'generic' -> `Array<T>`
    '@typescript-eslint/no-extraneous-class': 'warn',
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/ban-types': [
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
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',

    // Part of recommended:
    // ------------------------------------------------------
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-explicit-any': [
      'warn',
      { fixToUnknown: false, ignoreRestArgs: true },
    ],
    '@typescript-eslint/indent': ['error', 2],
    // "error" just feels too aggressive
    '@typescript-eslint/no-inferrable-types': 'warn',
    // Needs discussion. TypeScript is pretty good at inferring return types
    '@typescript-eslint/explicit-function-return-type': false,
    // '@typescript-eslint/explicit-function-return-type': [ 'warn', { allowTypedFunctionExpressions: true, allowExpressions: true } ],
    '@typescript-eslint/consistent-type-assertions': {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter',
    },
  },

	overrides: [
		{
			files: ['*.js', '*.jsx'],
			rules: {
				// This seems like a sensible default – to avoid typescript being annoying about
				// node scripts that require require() to function correctly.
				// However, when writing TypeScript this pattern should never be used.
				'@typescript-eslint/no-var-requires': false,
			},
		},
	],
};
