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
        'quotes': [ 'error', 'single' ],
        'comma-dangle': [ 'warn', 'always-multiline' ],
        'semi': [ 'error', 'always' ],
        'brace-style': [ 'warn', 'stroustrup', { allowSingleLine: true }],
        'curly': [ 'warn', 'all' ],
        //'no-trailing-spaces': 'warn',
        'space-before-blocks': 'warn',
        'keyword-spacing': 'warn',
        'no-whitespace-before-property': 'error',
        'unicode-bom': 'error',
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        'no-eval': 'error',
        'arrow-parens': ['warn', 'always'],
        'eqeqeq': ['error', 'always', {'null': 'ignore'}],
        'block-scoped-var': 'error',
        'class-methods-use-this': 'warn',
        //'complexity': ['warn', 5],
        'no-prototype-builtins': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        // If you really, really NEED `console.log()` without warnings,
        // either do `window.console.log();` or explicitly allow it
        // by using a `/*eslint no-console: false */` marker
        'no-console': ['warn', { allow: ['warn', 'error', 'trace', 'info'] }],
        'no-div-regex': 'error',
        'no-label-var': 'error',
        'no-use-before-define': ['error', { variables: false, functions: false, classes: false }],
        'no-undef-init': 'error',
        'space-before-function-paren': ['warn', {anonymous: 'always', named: 'never', asyncArrow: 'ignore' }],
        'no-empty': ['error', { allowEmptyCatch: true }],

    // eslint-plugin-destructuring:
        'destructuring/no-rename': 'error',
        'destructuring/in-params': ['error', { 'max-params' : 1 }],
        'destructuring/in-methods-params': 'error',
    // See also: eslint-plugin-es
    // https://mysticatea.github.io/eslint-plugin-es/rules/no-destructuring.html
    },
};
