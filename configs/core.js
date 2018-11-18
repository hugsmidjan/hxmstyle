module.exports = {
    extends: [
        'eslint:recommended',
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'destructuring',
    ],
    rules: {
        'linebreak-style': [ 'error', 'unix' ],
        'quotes': [ 'error', 'single'/*, { avoidEscape: true, allowTemplateLiterals: false }*/ ],
        'comma-dangle': [ 'warn', 'always-multiline' ],
        'semi': [ 'error', 'never' ],
        'brace-style': [ 'warn', '1tbs', { allowSingleLine: true }],
        'curly': [ 'error', 'all' ],
        //'no-trailing-spaces': 'warn',
        'space-before-blocks': 'warn',
        'keyword-spacing': 'warn',
        'no-whitespace-before-property': 'error',
        'unicode-bom': 'error',
        'no-unused-vars': 'warn',
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        'no-eval': 'error',
        'arrow-parens': ['warn', 'always'],
        'no-confusing-arrow': ['error', { allowParens: false }],
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
        'no-mixed-operators': 'error',
        'no-use-before-define': ['error', { variables: false, functions: false, classes: false }],
        'no-undef-init': 'error',
        'space-before-function-paren': ['warn', {anonymous: 'always', named: 'never', asyncArrow: 'ignore' }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-sequences': 'error',
        // https://eslint.org/docs/rules/indent#options
        'indent': ['error', 4],
        'no-tabs': ['error', { allowIndentationTabs: true }],
        'max-len': ['warn', { code: 100, ignoreUrls: true }],

        // eslint-plugin-destructuring:
        'destructuring/no-rename': 'error',
        'destructuring/in-params': ['error', { 'max-params' : 1 }],
        'destructuring/in-methods-params': 'error',
        // See also: https://mysticatea.github.io/eslint-plugin-es/rules/no-destructuring.html
    },
};
