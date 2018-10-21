const basicConfig = {
    foo: true,
    rules: {
        // eslint-plugin-destructuring:
        'destructuring/no-rename': 'error',
        'destructuring/in-params': ['error', { 'max-params' : 1 }],
        'destructuring/in-methods-params': 'error',
        // See also: eslint-plugin-es
        // https://mysticatea.github.io/eslint-plugin-es/rules/no-destructuring.html
    },

};

// TODO:

//   * Import vscode .eslintrc into basicConfig above
//   * Review eslint-plugin-es and decide if certain es6 featues should be outright banned
//   * Add reactConfig and fantasyConfig
//   * Read .hxmsylerc.json and apply optional configs when applicable


module.exports = (userCfg) => {
    // TODO: Read up on ESLint's 'extends' directive and sharable configs:
    // https://eslint.org/docs/developer-guide/shareable-configs
    const config = Object.assign({}, basicConfig);
    Object.keys(userCfg).forEach((key) => {
        if ( config[key] == null ) {
            config[key] = userCfg[key];
        }
        else {
            console.error('TODO: Deep merge, prevent accidental wipeouts of "plugins" and other arrays');
        }
    });
    return config;
};
