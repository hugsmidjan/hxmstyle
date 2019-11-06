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
	typescript: true,
	stylus: true,
	react: true,
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

const projectHasTypeScript = () => projectDeps.typescript;

if (args.typescript == null && projectHasTypeScript()) {
	console.info('TypeScript detected.');
	args.typescript = true;
}

const installDeps = hxmstylePkg.peerDependencies;
Object.entries(hxmstylePkg.optionals).forEach(([option, deps]) => {
	if (args[option] != null) {
		Object.entries(deps).forEach(([name, version]) => {
			installDeps[name] = version;
		});
	}
});

// install/upgrade plugins
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

// Create default .eslintrc.js file
if (!fs.existsSync(projectPath + '.eslintrc.js')) {
	console.info('Creating .eslintrc.js');
	exec('cp ' + hxmstylePath + 'starters/eslintrc.js .eslintrc.js');
	console.info('- Done.');
}
// Create default .preddierrc.js file
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
		Object.entries(projectRules).forEach(([key, rule]) => {
			if (searchingForMarker) {
				searchingForMarker = key !== projectSpecificMarker;
			} else if (rule !== stylintRules[key]) {
				delete stylintRules[key]; // delete from Object.keys() array
				stylintRules[key] = rule; // Re-insert at end of Object.keys()
			}
		});
	}
	console.info(hasStylintrc ? 'Updating .stylintrc' : 'Adding .stylintrc');
	fs.writeFileSync(stylintrcPath, JSON.stringify(stylintRules, null, '\t') + '\n');
	console.info('- Done.');
}

// Write settings to package.json
projectPkg = JSON.parse(fs.readFileSync(projectPkgPath)); // Re-read package.json since its content may have changed.
projectPkg.hxmstyle = {
	options: args,
	dependenciesAdded: Object.keys(installDeps).sort(),
};
fs.writeFileSync(projectPkgPath, JSON.stringify(projectPkg, null, '\t') + '\n');

// Suggest adding a format script to package.json
if (!projectPkg.scripts || !projectPkg.scripts.format) {
	const jsExts = args.typescript ? '{js,ts,tsx}' : 'js';
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
				'\\"  &&  prettier --write \\"*.json\\""',
			'    },',
			'',
			'More info: https://github.com/hugsmidjan/hxmstyle/blob/master/README.md#example-npm-scripts',
		].join('\n')
	);
}
