/* globals process */
const path = require('path');
const getProjectOptions = () => (require(process.cwd()+'/package.json').hxmstyle || {}).options || {};

const rulesetPath = path.parse( require.resolve('hxmstyle') ).dir + '/configs/';
const extendModules = ['core', 'react', 'fantasy'];

const getBaseConfig = () => {
    const _extends = [
        rulesetPath + 'core.js',
    ];
    const options = getProjectOptions();
    Object.keys(options).forEach((name) => {
        if ( options[name] && extendModules.indexOf(name) > -1 ) {
            _extends.push( rulesetPath + name + '.js' );
        }
    });
    // Add prettier-specific rules afterwards to ensure prettier rule-overrides
    // come after the basic eslint configs for each module
    _extends.forEach((path) => {
        const prettierCfgPath = path.replace(/\.js$/, '-prettier.js');
        _extends.push( prettierCfgPath );
    });
    return { extends: _extends };
};



module.exports = (userCfg) => {
    const config = Object.assign({}, userCfg, getBaseConfig());

    // Merge in the user's "extends"
    if (userCfg.extends) {
        if (typeof userCfg.extends === 'string') {
            userCfg.extends = [userCfg.extends];
        }
        userCfg.extends.forEach((rulePackageName) => {
            config.extends.push(rulePackageName);
        });
    }

    return config;
};
