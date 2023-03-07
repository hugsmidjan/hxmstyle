/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

const path = require('path');

let _pkg;
const getProjectPkg = () => _pkg || require(process.cwd() + '/package.json');

const rulesetPath = path.parse(require.resolve('@hugsmidjan/hxmstyle')).dir + '/configs/';
const extendModules = ['core', 'typescript', 'react'];

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
  const config = Object.assign(
    {
      root: true,
      env: {
        browser: true,
        node: true,
        es6: true,
      },
    },
    userCfg,
    { extends: getBaseExtends(options) }
  );

  // Merge in the user's "extends"
  if (userCfg.extends) {
    if (typeof userCfg.extends === 'string') {
      userCfg.extends = [userCfg.extends];
    }
    userCfg.extends.forEach((rulePackageName) => {
      config.extends.push(rulePackageName);
    });
  }
  // Merge in the user's "extendsFirst" BEFORE other extends
  // to put them at a lower priority than the hxmstyle rules.
  if (userCfg.extendsFirst) {
    userCfg.extendsFirst.forEach((rulePackageName) => {
      config.extends.unshift(rulePackageName);
    });
    // cleanup
    delete userCfg.extendsFirst;
  }

  return config;
};

module.exports.getProjectPkg = getProjectPkg;
