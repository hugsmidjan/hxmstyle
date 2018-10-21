#!/usr/bin/env node
/* globals process */
const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const projectPath = process.cwd()+'/';
const hxmstylePath = path.parse( require.resolve('hxmstyle') ).dir + '/';
const hxmstylePgk = require(hxmstylePath + 'package.json');
const projectPgk = require(projectPath + 'package.json');
const projectDeps = Object.assign( {}, projectPgk.dependencies, projectPgk.devDependencies );

const parseArgs = (argv) => {
    const args = {};
    let name = '';
    argv.forEach((arg) => {
        if (/^--/.test(arg)) {
            name = arg.substr(2);
            args[name] = args[name] || [];
        }
        else {
            if ( arg === 'false' ) {
                args[name] = false;
            }
            else if ( args[name] ) {
                args[name].push(arg);
            }
        }
    });
    return args;
};

const hxmstylercPath = projectPath+'.hxmstylerc.json';
const lastSettings = fs.existsSync(hxmstylercPath) ?
    JSON.parse( fs.readFileSync(hxmstylercPath)||'' ) || {}:
    {};

let args = parseArgs(process.argv.slice(2));



// Auto-detect if stylus or react are installed in the project
if ( args.stylus == null && projectDeps.stylus ) {
    console.info('Stylus detected.');
    args.stylus = true;
}
if ( args.react == null && (projectDeps.react || projectDeps.preact || projectDeps.inferno) ) {
    const reactLike = projectDeps.react ? 'React' : projectDeps.preact ? 'Preact' : 'Inferno';
    console.info(reactLike + ' detected.');
    args.react = true;
}


args = Object.assign({}, lastSettings.options, args);
const settings = Object.assign({}, lastSettings, { options: args });
fs.writeFileSync(hxmstylercPath, JSON.stringify(settings, null, 4));



console.info(args);

const installDeps = hxmstylePgk.peerDependencies;
const removeDeps = {};
Object.keys(hxmstylePgk.optionals).forEach((option) => {
    if ( args[option] != null ) {
        const deps = hxmstylePgk.optionals[option];
        Object.keys(deps).forEach((name) => {
            if ( args[option] ) {
                installDeps[name] = deps[name];
            }
            else if (projectDeps[name]) {
                removeDeps[name] = true;
            }
        });
    }
});


const yarn = !!exec('which yarn');

// install/upgrade plugins
const installs = Object.keys(installDeps).map((name) => name + '@' + installDeps[name]);
if ( installs.length ) {
    console.info('Adding/upgrading:', installs);
    const installCmd = yarn ? 'yarn add --dev ' : 'npm install --save-dev ';
    exec(installCmd + installs.join(' '));
}
// remove unused plugins
const removals = Object.keys(removeDeps);
if ( removals.length ) {
    console.info('Removing:', removals);
    const removeCmd = yarn ? 'yarn remove ' : 'npm remove ';
    exec(removeCmd + removals.join(' '));
}


// Create default .eslintrc.js file
if ( !fs.existsSync(projectPath+'.eslintrc.js') ) {
    console.info('Creating .eslintrc.js');
    exec('cp ' + hxmstylePath + 'starters/eslintrc.js .eslintrc.js');
}
// Update (overwrite) .stylintrc
if ( args.stylus ) {
    const stylintrcPath = projectPath+'.stylintrc';
    if ( !fs.existsSync(stylintrcPath) || /"hxmstyle"\s*:/.test(fs.readFileSync(stylintrcPath)) ) {
        console.info('Adding/updating .stylintrc');
        exec('cp ' + hxmstylePath + 'starters/stylintrc.json .stylintrc');
    }
}



