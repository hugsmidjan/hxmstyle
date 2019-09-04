// This file is maintained as a JavaScript module for convenience.
// Stylint only consumes JSON however.
module.exports = {
	__hxmstyle__: [
		'--------------------------------------------------------------------------------------------',
		' BEWARE: This file is manged by "hxmstyle" and will be rewritten on next install/update.    ',
		' Place your project specific rules BELOW the `__project_specific_rules__` marker.           ',
		'--------------------------------------------------------------------------------------------',
	],

	exclude: ['node_modules/**/*', 'vendor/**/*'],
	reporterOptions: {
		columns: ['lineData', 'severity', 'description', 'rule'],
		columnSplitter: '  ',
		showHeaders: false,
		truncate: true,
	},
	groupOutputByFile: true,
	maxErrors: false,
	maxWarnings: false,

	customProperties: [], // alias for `mixins`
	mixins: [], // White-list of transparent mixins ("custom properties") being used

	blocks: 'always', // Use `$myBlock = @block { ...`
	brackets: { expect: 'always', error: true },
	colons: { expect: 'always', error: true },
	semicolons: 'never',
	colors: false, // Example if true: prefer `color $red` over `color #f00`
	commaSpace: 'always',
	commentSpace: 'always',
	cssLiteral: 'never',
	depthLimit: 3,
	duplicates: true,
	efficient: false, // always: prefer `margin: 1em 0 2em` over `margin: 1em 0 2em 0`
	extendPref: '@extend',
	globalDupe: false,
	indentPref: false, // number of spaces per indent-level (Affects "depthLimit" above). Use `false` for tabs
	leadingZero: 'never',
	mixed: true, // Complain about mixed space and tabs. If `indentPref:false` and `mixed:true`then prefer \tmargin\s0 over \s\s\s\smargin\s0
	namingConvention: false, // for .classNames, #id, and $variables. Options: [ false | 'lowercase-dash' | 'lowercase_underscore' | 'camelCase' | 'BEM' ]
	namingConventionStrict: false,
	none: 'never', //  if 'never': prefer outline 0 over outline none
	noImportant: true,
	parenSpace: 'never', // If never: prefer my-mixin($myParam) over my-mixin( $myParam )
	placeholders: 'always', // if always: prefer @extends $placeholder over $extends .some-class
	prefixVarsWithDollar: { expect: 'always', error: true },
	quotePref: 'single',
	sortOrder: false, // Require certain sorting property
	stackedProperties: 'never', // No one-liners. Enforce putting properties on new lines
	trailingWhitespace: 'never',
	universal: false,
	valid: true, // check if selectors have valid HTML tag-names and properties are valid CSS
	zeroUnits: 'never',
	zIndexNormalize: false,

	'stylusSupremacy.insertNewLineAroundProperties': true,
	'stylusSupremacy.insertNewLineBeforeElse': true,
	'stylusSupremacy.insertParenthesisAfterNegation': true,
	'stylusSupremacy.selectorSeparator': ',\n',

	__project_specific_rules__: [
		'--------------------------------------------------------------------------------------------',
		' Place your project specific rules BELOW this point.                                        ',
		' Anything ABOVE this point will be automatically wiped/rewritten.                           ',
		'--------------------------------------------------------------------------------------------',
	],
};
