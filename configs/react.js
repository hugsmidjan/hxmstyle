module.exports = {
	extends: ['plugin:react/recommended'],
	settings: {
		react: {
			// createClass: 'createClass', // Regex for Component Factory to use, default to 'createClass'
			// pragma: 'React',  // Pragma to use, default to 'React'
			version: 'detect', // React version, default to the latest React stable release
		},
	},
	plugins: ['react', 'react-hooks'],
	rules: {
		// https://www.npmjs.com/package/eslint-plugin-react
		'react/prop-types': ['off'],
		'react/no-unknown-property': ['warn'], // warns about class="" and lowercase event-attrs (e.g. onclick="") etc...
		'react/no-unescaped-entities': ['warn', { forbid: ['>', '}'] }],
		'react/no-deprecated': ['warn'],
		'react/jsx-no-useless-fragment': ['warn'],
		'react/display-name': ['off' /*, { ignoreTranspilerName: true }*/],
		// https://www.npmjs.com/package/eslint-plugin-react-hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
