const projectPkg = require(process.cwd() + '/package.json');
let reactVersion =
  (projectPkg.dependencies || {}).react || (projectPkg.devDependencies || {}).react;
if (reactVersion) {
  const m = reactVersion.match(/(\d+)/);
  reactVersion = m && m[1];
}

module.exports = {
  extends: ['plugin:react/recommended'],
  settings: {
    react: {
      // createClass: 'createClass', // Regex for Component Factory to use, default to 'createClass'
      // pragma: 'React',  // Pragma to use, default to 'React'
      version: reactVersion || undefined, // React version, default to the latest React stable release
    },
  },
  plugins: ['react'],
  rules: {
    // https://www.npmjs.com/package/eslint-plugin-react
    'react/prop-types': ['off'],
    'react/no-unknown-property': ['warn'], // warns about class="" and lowercase event-attrs (e.g. onclick="") etc...
    'react/no-unescaped-entities': ['warn'],
    'react/no-deprecated': ['warn'],
    'react/display-name': ['off' /*, { ignoreTranspilerName: true }*/],
  },
};
