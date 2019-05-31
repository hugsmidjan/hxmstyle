/* globals process */
const path = require('path');

let _pkg;
const getProjectPkg = () => _pkg || require(process.cwd() + '/package.json');

const rulesetPath = path.parse(require.resolve('@hugsmidjan/hxmstyle')).dir + '/configs/';
const extendModules = [
  'core',
  'typescript',
  'react',
  'fantasy', // deprecated as of v0.3.0
];

const getBaseExtends = (opts) => {
  const _extends = [rulesetPath + 'core.js'];
  const options = (getProjectPkg().hxmstyle || {}).options || {};
  Object.keys(options).forEach((name) => {
    if (options[name] && extendModules.indexOf(name) > -1) {
      _extends.push(rulesetPath + name + '.js');
    }
  });
  // Add prettier-specific rules afterwards to ensure prettier rule-overrides
  // come after the basic eslint configs for each module
  if (!opts || opts._guiltily_disable_prettier !== true) {
    _extends.forEach((path) => {
      const prettierCfgPath = path.replace(/\.js$/, '-prettier.js');
      _extends.push(prettierCfgPath);
    });
  }
  return _extends;
};

module.exports = (userCfg = {}, options) => {
  _pkg = options && options.pkg;
  const config = Object.assign({}, userCfg, {
    extends: getBaseExtends(options),
  });

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

module.exports.getProjectPkg = getProjectPkg;
