const prettierRules = require('./configs/prettier').rules['prettier/prettier'][1];

module.exports = (userCfg) => {
    return Object.assign({}, prettierRules, userCfg);
};
