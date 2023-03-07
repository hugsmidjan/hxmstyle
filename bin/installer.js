#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const projectPath = process.cwd() + '/';
const projectPkgPath = projectPath + 'package.json';
let projectPkg = require(projectPkgPath);
const projectDeps = Object.assign(
  {},
  projectPkg.dependencies,
  projectPkg.devDependencies
);
const lastSettings = projectPkg.hxmstyle || {};

const hxmstylePath = path.parse(require.resolve('@hugsmidjan/hxmstyle')).dir + '/';
const hxmstylePkg = require(hxmstylePath + 'package.json');

// ---------------------------------------------------------------------------

const parseArgs = (argv, supportedArgs) => {
  const args = {};
  let name = '';
  argv
    // Normalize "--flag=value" into "--flag", "value"
    .reduce((arr, arg) => {
      arr.push.apply(arr, arg.split('='));
      return arr;
    }, [])
    .filter(Boolean)
    .forEach((arg) => {
      if (/^--/.test(arg)) {
        name = arg.substr(2);
        if (supportedArgs[name]) {
          args[name] = true;
        }
      } else if (supportedArgs[name]) {
        if (arg === 'false') {
          args[name] = false;
        }
      }
    });
  return args;
};

const cleanOptions = (options) => {
  options = Object.assign({}, options);
  Object.keys(options).forEach((key) => {
    // cast weird ["true"] values to simple boolean true
    options[key] = !!options[key];
  });
  return options;
};

const supportedArgs = {
  typescript: true,
  scss: true,
  react: true,
};
const args = Object.assign(
  cleanOptions(lastSettings.options),
  parseArgs(process.argv.slice(2), supportedArgs)
);

// auto-detect options based on already installed deps
{
  if (args.scss == null && projectDeps.scss) {
    console.info('scss detected.');
    args.scss = true;
  }
  const projectHasReact = () =>
    projectDeps.react || projectDeps.preact || projectDeps.inferno;
  if (args.react == null && projectHasReact()) {
    const reactLike = projectDeps.react
      ? 'React'
      : projectDeps.preact
      ? 'Preact'
      : 'Inferno';
    console.info(reactLike + ' detected.');
    args.react = true;
  }

  const projectHasTypeScript = () => projectDeps.typescript;
  if (args.typescript == null && projectHasTypeScript()) {
    console.info('TypeScript detected.');
    args.typescript = true;
  }
}

// ---------------------------------------------------------------------------

const installDeps = {
  ...hxmstylePkg.peerDependencies,
};
Object.entries(hxmstylePkg.peerDependenciesMeta).forEach(([key, meta]) => {
  // Skip installing "optional" peerDependences, unless they're
  // explicitly flagged in `args` AND missing from projectPkg
  if (
    meta.optional &&
    (!args[key] || projectDeps[key] || projectPkg.peerDependencies[key])
  ) {
    delete installDeps[key];
  }
});
// Keeping track of the names of dependences that are installed by hxmstyle
// (Currently these are only deps related to `args.scss`.)
const managedDeps = [];
Object.entries(hxmstylePkg.optionals).forEach(([option, deps]) => {
  if (args[option]) {
    Object.entries(deps).forEach(([name, version]) => {
      installDeps[name] = version;
      managedDeps.push(name);
    });
  }
});

// install/upgrade plugins
{
  const installs = Object.entries(installDeps).map(
    ([name, version]) => name + '@' + version
  );
  if (!projectDeps['@hugsmidjan/hxmstyle']) {
    installs.push('@hugsmidjan/hxmstyle@^' + hxmstylePkg.version);
  }
  if (installs.length) {
    console.info('Adding/upgrading dependencies:\n', installs);
    const useYarn = !!exec('which yarn') && fs.existsSync(projectPath + 'yarn.lock');
    const installCmd = useYarn ? 'yarn add --dev ' : 'npm install --save-dev ';
    exec(installCmd + installs.join(' '));
    console.info('- Done.');
  }
}

// ---------------------------------------------------------------------------

// Create default .eslintrc.js file
if (!fs.existsSync(projectPath + '.eslintrc.js')) {
  console.info('Creating .eslintrc.js');
  exec('cp ' + hxmstylePath + 'starters/eslintrc.js .eslintrc.js');
  console.info('- Done.');
}
// Create default .prettierrc.js file
if (!fs.existsSync(projectPath + '.prettierrc.js')) {
  console.info('Creating .prettierrc.js');
  exec('cp ' + hxmstylePath + 'starters/prettierrc.js .prettierrc.js');
  console.info('- Done.');
}

if (args.typescript) {
  // Create default tsconfig.json file
  if (!fs.existsSync(projectPath + 'tsconfig.json')) {
    console.info('Creating minimal tsconfig.json');
    exec('cp ' + hxmstylePath + 'starters/tsconfig.json tsconfig.json');
    console.info('- Done.');
  } else {
    // Or at least strongly suggest turning on `strict` mode, if needed
    try {
      const tscfg = require(projectPath + 'tsconfig.json');
      if (!tscfg.compilerOptions || !tscfg.compilerOptions.strict) {
        console.warn(
          [
            'Consider turning on `strict` mode in your `tsconfig.json`',
            "...like SERIOUSLY!  Don't be daft. Always be strict.",
            '{',
            '  "compilerOptions": {',
            '    "strict": true',
            '  }',
            '}',
            '',
          ].join('\n')
        );
      }
    } catch (e) {}
  }
}

// Update/manage .editorconfig
{
  const editorcfgPath = projectPath + '.editorconfig';
  let configRules = fs.readFileSync(hxmstylePath + 'starters/editorconfig.cfg');
  const hasEditorconfig = fs.existsSync(editorcfgPath);
  let manageConfig = true;
  if (hasEditorconfig) {
    const projectRules = fs.readFileSync(editorcfgPath).toString();
    const hxmStyleMarker = /#+\s*__hxmstyle__\s/i;
    const projectSpecificMarker = /#+\s*__project_specific_rules__.*?\n/i;
    manageConfig = hxmStyleMarker.test(projectRules);
    if (manageConfig) {
      const projectSpecificConfig = projectRules.split(projectSpecificMarker)[1];
      if (projectSpecificConfig) {
        configRules = configRules + projectSpecificConfig;
      }
    }
  }
  if (manageConfig) {
    console.info(hasEditorconfig ? 'Updating .editorconfig' : 'Adding .editorconfig');
    fs.writeFileSync(editorcfgPath, configRules);
    console.info('- Done.');
  }
}

// Update .stylelintrc.json
if (args.scss) {
  const stylelintrcPath = projectPath + '.stylelintrc.json';
  const stylelintRules = require(hxmstylePath + 'starters/stylelintrc.json');
  const hasStylelintrc = fs.existsSync(stylelintrcPath);
  console.info(
    hasStylelintrc ? 'Updating .stylelintrc.json' : 'Adding .stylelintrc.json'
  );
  fs.writeFileSync(stylelintrcPath, JSON.stringify(stylelintRules, null, '\t') + '\n');
  console.info('- Done.');
}

// ---------------------------------------------------------------------------

// Write settings to package.json
{
  const hasOptions = !!Object.keys(args).length;
  const hasDepsAdded = !!managedDeps.length;
  if (hasOptions || hasDepsAdded) {
    const hxmstyle = {};
    if (hasOptions) {
      hxmstyle.options = args;
    }
    if (hasDepsAdded) {
      hxmstyle.dependenciesAdded = managedDeps.sort();
    }
    // Re-read `package.json` since its contents may have changed due to installs.
    projectPkg = JSON.parse(fs.readFileSync(projectPkgPath));
    projectPkg.hxmstyle = hxmstyle;
    fs.writeFileSync(projectPkgPath, JSON.stringify(projectPkg, null, '\t') + '\n');
  }
}

// Suggest adding a format script to package.json
if (!projectPkg.scripts || !projectPkg.scripts.format) {
  const jsExts = args.typescript ? '{js,ts,tsx}' : 'js,jsx';
  console.info(
    [
      'Consider adding a "format" npm script to your `package.json`',
      'Example:',
      '',
      '    "scripts": {',
      '        "format": "eslint --fix  \\"*.' +
        jsExts +
        '\\" \\"_src/**/*.' +
        jsExts +
        '\\"  &&  prettier --write  \\"*.md\\" \\"*.json\\""',
      '    },',
      '',
      'More info: https://github.com/hugsmidjan/hxmstyle/blob/master/README.md#example-npm-scripts',
    ].join('\n')
  );
}
