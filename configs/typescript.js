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
			plugins: ['deprecation'],
			rules: {
				'@typescript-eslint/explicit-member-accessibility': 'off',
				'@typescript-eslint/camelcase': 'off',
				'@typescript-eslint/interface-name-prefix': 'off', // 'never' | 'always // 'never' seems like a weird default
				'@typescript-eslint/array-type': ['warn', { default: 'generic' }], // 'array' -> `T[]` ;  'generic' -> `Array<T>`
				'@typescript-eslint/no-extraneous-class': 'warn',
				'@typescript-eslint/no-useless-constructor': 'warn',
				'@typescript-eslint/no-unnecessary-condition': 'warn',
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
					'warn',
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
