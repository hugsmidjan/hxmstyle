/* globals process */
const path = require('path');
const getProjectOptions = () => (require(process.cwd()+'/package.json').hxmstyle || {}).options || {};

const rulesetPath = path.parse( require.resolve('hxmstyle') ).dir + '/configs/';
const extendModules = {
    core: '',
    react: '',
    fantasy: '',
};


module.exports = (userCfg) => {
    const extendsList = [
        rulesetPath + 'core.js',
        rulesetPath + 'prettier.js',
    ];

    const options = getProjectOptions();
    Object.keys(options).forEach((name) => {
        if ( options[name] && name in extendModules ) {
            extendsList.push(
                extendModules[name] ||
                rulesetPath + name + '.js'
            );
        }
    });

    const config = Object.assign({}, userCfg, { extends: extendsList });

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
