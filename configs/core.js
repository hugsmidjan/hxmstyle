module.exports = {
  extends: ['eslint:recommended'],
  // parser: 'babel-eslint', <-- TODO: figure out if this is something we'd like to do
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'destructuring',
    'destructure-depth',
    'unused-imports',
    'simple-import-sort',
    'import',
    'node-import',
  ],

  // This adds soft warning on unused `eslint-disable` directives,
  // and instructs auto-fix to remove them.
  // Problem: It doesn't flag/remove unused `eslint-enable` directives.
  reportUnusedDisableDirectives: true,

  /* prettier-ignore */
  rules: {
		'dot-notation': 'warn',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
		'comma-dangle': ['warn', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'ignore',
		}],
    'semi': ['warn', 'always'],
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'curly': ['warn', 'all'],
    //'no-trailing-spaces': 'warn',
    'space-before-blocks': 'warn',
    'keyword-spacing': 'warn',
    'no-whitespace-before-property': 'error',
    'unicode-bom': 'error',
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        // allow vars called `_`, `__`, `___`, etc. to facilitate
        // array destructuring (not captureed by `ignoreRestSiblings`)
        varsIgnorePattern: '^_',
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_"
      },
    ],
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
    // (Intentionally omitting: 'debug' as it aliases 'log')
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'group', 'groupCollapsed', 'groupEnd'] }],
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
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'max-len': ['warn', {
      code: 120,
      ignoreUrls: true,
      ignoreComments: true,
      // ignoreTrailingComments: true,
      ignoreTemplateLiterals: true,
    }],
    'no-var': 'warn',
    'prefer-const': ['warn', { destructuring: 'all' }], // Wish there was a way to prevent autofixing this one.
    'prefer-template': 'warn',
    'no-async-promise-executor': 'error',
		'no-throw-literal': 'error',

		'template-tag-spacing': ['error', 'never'],
		'no-irregular-whitespace': ['error', {
			"skipStrings": true, // Default
			"skipComments": true,
			"skipTemplates": true,
			"skipRegExps": true
		}],


		'no-useless-rename': 'warn',

		// Rules for "eslint-plugin-destructure-depth":
		'destructure-depth/max-depth': 'error',

    // Rules for "eslint-plugin-destructuring":
    // 'destructuring/no-rename': 'error',
    'destructuring/in-params': ['warn', {'max-params': 2 }], // Allow {items.map(({ value, label}, i) => <li key={i}/* ... */</li>)}
    'destructuring/in-methods-params': 'warn',
    // See also: https://mysticatea.github.io/eslint-plugin-es/rules/no-destructuring.html

    // Rules for "eslint-plugin-unused-imports":
    "sort-imports": "off",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "unused-imports/no-unused-imports": "warn",
    "node-import/prefer-node-protocol": "warn",
    "simple-import-sort/exports": "warn",
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` related packages come first.
          ['^p?react', '^@?\\w'],
          // Magic (unprefixed) folder aliases
          ['^(?:prismic|payload)(?:/.*|$)'],
          ['^(?:components|containers)(?:/.*|$)'],
          ['^(?:utils|apis?|hocs|hooks|i18n|pages|views|libs?|store|theme|types)(?:/.*|$)'],
          // Internal "subpath imports" (https://nodejs.org/api/packages.html#subpath-imports)
          ['^#'],
          // Commonly used (idiomatic) local path aliases/prefixes
          ['^@/'],
          ['^~/'],
          // Anything not matched in another group.
          ['^'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports. (with optional .js/.mjs/.cjs file-extension)
          ['^.+\\.(?:s?css|styles)(?:\\.[mc]?js)?$'],
        ],
      },
    ],
  },
};
