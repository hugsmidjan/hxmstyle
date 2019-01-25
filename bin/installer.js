#!/usr/bin/env node
/* globals process require */
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

const hxmstylePath = path.parse(require.resolve('hxmstyle')).dir + '/';
const hxmstylePkg = require(hxmstylePath + 'package.json');

const parseArgs = (argv, supportedArgs) => {
  const args = {};
  let name = '';
  argv
    // Normalize "--flag=value" into "--flag", "value"
    .reduce((arr, arg) => {
      arr.push.apply(arr, arg.split('='));
      return arr;
    }, [])
    .forEach((arg) => {
      if (/^--/.test(arg)) {
        name = arg.substr(2);
        if (supportedArgs[name]) {
          args[name] = args[name] || [];
        }
      } else if (supportedArgs[name]) {
        if (arg === 'false') {
          args[name] = false;
        } else if (args[name]) {
          args[name].push(arg);
        }
      }
    });
  return args;
};
const supportedArgs = {
  stylus: true,
  react: true,
  fantasy: true,
};
const args = Object.assign(
  {},
  lastSettings.options,
  parseArgs(process.argv.slice(2), supportedArgs)
);

// Auto-detect if stylus or react are installed in the project
const projectHasStylus = () => {
  return (
    projectDeps.stylus ||
    (projectDeps.hxmgulp && fs.existsSync(projectPath + 'node_modules/stylus'))
  );
};

if (args.stylus == null && projectHasStylus()) {
  console.info('Stylus detected.');
  args.stylus = true;
}

const projectHasReact = () => {
  return projectDeps.react || projectDeps.preact || projectDeps.inferno;
};

if (args.react == null && projectHasReact()) {
  const reactLike = projectDeps.react
    ? 'React'
    : projectDeps.preact
    ? 'Preact'
    : 'Inferno';
  console.info(reactLike + ' detected.');
  args.react = true;
}

const installDeps = hxmstylePkg.peerDependencies;
Object.keys(hxmstylePkg.optionals).forEach((option) => {
  if (args[option] != null) {
    const deps = hxmstylePkg.optionals[option];
    Object.keys(deps).forEach((name) => {
      if (args[option]) {
        installDeps[name] = deps[name];
      }
    });
  }
});

// install/upgrade plugins
const installs = Object.keys(installDeps).map((name) => name + '@' + installDeps[name]);
if (!projectDeps.hxmstyle) {
  installs.push('github:hugsmidjan/hxmstyle#semver:^' + hxmstylePkg.version);
}
if (installs.length) {
  console.info('Adding/upgrading dependencies:\n', installs);
  const hasYarn = !!exec('which yarn');
  const installCmd = hasYarn ? 'yarn add --dev ' : 'npm install --save-dev ';
  exec(installCmd + installs.join(' '));
  console.info('- Done.');
}

// Create default .eslintrc.js file
if (!fs.existsSync(projectPath + '.eslintrc.js')) {
  console.info('Creating .eslintrc.js');
  exec('cp ' + hxmstylePath + 'starters/eslintrc.js .eslintrc.js');
  console.info('- Done.');
}
if (!fs.existsSync(projectPath + '.prettierrc.js')) {
  console.info('Creating .prettierrc.js');
  exec('cp ' + hxmstylePath + 'starters/prettierrc.js .prettierrc.js');
  console.info('- Done.');
}

// Update .editorconfig
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

// Update .stylintrc
if (args.stylus) {
  const stylintrcPath = projectPath + '.stylintrc';
  const stylintRules = require(hxmstylePath + 'starters/stylintrc.js');
  const hasStylintrc = fs.existsSync(stylintrcPath);
  if (hasStylintrc) {
    const hxmStyleMarker = '__hxmstyle__';
    const projectSpecificMarker = '__project_specific_rules__';
    const projectRules = JSON.parse(fs.readFileSync(stylintrcPath));
    // Maintain anything below the projectSpecificMarker in projectRules
    let searchingForMarker = hxmStyleMarker in projectRules; // If no hxmStyleMarker is found - assume every rule is project-specific
    Object.keys(projectRules).forEach((key) => {
      if (searchingForMarker) {
        searchingForMarker = key !== projectSpecificMarker;
      } else if (projectRules[key] !== stylintRules[key]) {
        delete stylintRules[key]; // delete from Object.keys() array
        stylintRules[key] = projectRules[key]; // Re-insert at end of Object.keys()
      }
    });
  }
  console.info(hasStylintrc ? 'Updating .stylintrc' : 'Adding .stylintrc');
  fs.writeFileSync(stylintrcPath, JSON.stringify(stylintRules, null, 4) + '\n');
  console.info('- Done.');
}

// Write settings to package.json
projectPkg = JSON.parse(fs.readFileSync(projectPkgPath)); // Re-read package.json since its content may have changed.
projectPkg.hxmstyle = {
  options: args,
  dependenciesAdded: Object.keys(installDeps).sort(),
};
fs.writeFileSync(projectPkgPath, JSON.stringify(projectPkg, null, 4) + '\n');

// Suggest adding a format script to package.json
if (!projectPkg.scripts && !projectPkg.scripts.format) {
  console.info(
    [
      'Consider adding a "format" npm script to your `package.json`',
      'Example:',
      '',
      '    "scripts": {',
      '        "format": "eslint --fix  \\"*.js\\" \\"_src/**/*.js\\"  &&  prettier --write \\"*.json\\""',
      '    },',
      '',
      'More info: https://github.com/hugsmidjan/hxmstyle/blob/master/README.md#example-npm-scripts',
    ].join('\n')
  );
}
