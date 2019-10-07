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
			rules: {
				'@typescript-eslint/explicit-member-accessibility': 'off',
				'@typescript-eslint/camelcase': 'off',
				'@typescript-eslint/interface-name-prefix': 'off', // 'never' | 'always // 'never' seems like a weird default
				'@typescript-eslint/array-type': ['warn', { default: 'generic' }], // 'array' -> `T[]` ;  'generic' -> `Array<T>`
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
				'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

				// Part of recommended:
				// ------------------------------------------------------
				'@typescript-eslint/ban-ts-ignore': 'off',
				'@typescript-eslint/no-use-before-define': 'warn',
				'@typescript-eslint/no-explicit-any': [
					'warn',
					{ fixToUnknown: false, ignoreRestArgs: true },
				],
				'@typescript-eslint/indent': ['error', 2],
				// "error" just feels too aggressive
				'@typescript-eslint/no-inferrable-types': 'warn',
				// Needs discussion. TypeScript is pretty good at inferring return types
				'@typescript-eslint/explicit-function-return-type': 'off',
				// '@typescript-eslint/explicit-function-return-type': [ 'warn', { allowTypedFunctionExpressions: true, allowExpressions: true } ],
			},
		},
	],
};
