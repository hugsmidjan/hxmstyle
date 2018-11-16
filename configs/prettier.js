module.exports = {
    extends: [
        'plugin:prettier/recommended',
    ],
    plugins: [
        'prettier',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            // NOTE: Some editor plugins such as prettier-vscode and prettier-atom
            // ONLY read options from .prettierrc, so the below options are ALSO
            // imported into myproject/.prettierrc.js
            {
                // Prettier options:
                // --------------------------------------------------
                'singleQuote': true,
            },
            { usePrettierrc: false },
        ],
     },
};
