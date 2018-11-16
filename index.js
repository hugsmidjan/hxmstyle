/* globals process */

const getProjectOptions = () => (require(process.cwd()+'/package.json').hxmstyle || {}).options || {};

const rulesetPrefix = './node_modules/hxmstyle/configs/';
const extendModules = {
    core: '',
    react: '',
    fantasy: '',
};


module.exports = (userCfg) => {
    const extendsList = [rulesetPrefix + 'core.js'];

    const options = getProjectOptions();
    Object.keys(options).forEach((name) => {
        if ( options[name] && name in extendModules ) {
            extendsList.push(
                extendModules[name] ||
                rulesetPrefix + name + '.js'
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
