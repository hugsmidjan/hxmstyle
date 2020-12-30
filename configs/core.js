module.exports = {
	extends: ['eslint:recommended'],
	// parser: 'babel-eslint', <-- TODO: figure out if this is something we'd like to do
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['destructuring'],
	/* prettier-ignore */
	rules: {
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
		'comma-dangle': ['warn', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'ignore',
		}],
    'semi': ['warn', 'always'],
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'curly': ['error', 'all'],
    //'no-trailing-spaces': 'warn',
    'space-before-blocks': 'warn',
    'keyword-spacing': 'warn',
    'no-whitespace-before-property': 'error',
    'unicode-bom': 'error',
    'no-unused-vars': 'warn',
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
    }],
    'no-eval': 'error',
    'arrow-parens': ['warn', 'always'],
    'eqeqeq': ['error', 'always', {'null': 'ignore'}],
    'block-scoped-var': 'error',
    'class-methods-use-this': 'warn',
    'complexity': ['warn', 15],
    'no-prototype-builtins': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-fallthrough': 'error',
    // For intentional logging in production, use `console.info()`
    // If you really, really NEED `console.log()` without warnings,
    // either do `window.console.log();` or `global.console.log();`,
    // or insert a `/*eslint no-console: false */` marker into your file.
    'no-console': ['warn', { allow: ['warn', 'error', 'trace', 'info'] }],
    'no-div-regex': 'error',
    'no-label-var': 'error',
    'no-use-before-define': 'warn',
    'no-undef-init': 'error',
    'space-before-function-paren': ['warn', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'ignore',
    }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-sequences': 'error',
    // https://eslint.org/docs/rules/indent#options
    'indent': ['warn', 2],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'max-len': ['warn', {
      code: 120,
      ignoreUrls: true,
      ignoreComments: true,
      // ignoreTrailingComments: true,
      ignoreTemplateLiterals: true,
    }],
    'no-var': 'warn',
    'prefer-const': 'warn', // Wish there was a way to prevent autofixing this one.
    'require-await': 'warn',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
		'no-throw-literal': 'error',

		'template-tag-spacing': ['error', 'never'],
		'no-irregular-whitespace': ['error', {
			"skipStrings": true, // Default
			"skipComments": true,
			"skipTemplates": true
		}],

    // eslint-plugin-destructuring:
    'destructuring/no-rename': 'error',
    'destructuring/in-params': ['error', { 'max-params': 2 }], // Allow {items.map(({ value, label}, i) => <li key={i}/* ... */</li>)}
    'destructuring/in-methods-params': 'error',
    // See also: https://mysticatea.github.io/eslint-plugin-es/rules/no-destructuring.html
  },
};
