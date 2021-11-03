module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'react/jsx-indent': [2, 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
		indent: [2, 'tab'],
		'no-tabs': 0,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@api', './src/api'],
					['@components', './src/components'],
					['@config', './src/config'],
					['@pages', './src/pages'],
					['@utils', './src/utils'],
					['@redux', './src/redux'],
					['@actions', './src/redux/actions'],
					['@reducers', './src/redux/reducers'],
					['@store', './src/redux/store'],
					['@types', './src/redux/types'],
					['@utils', './src/utils'],
				],
				extensions: ['.ts', '.js', '.jsx', '.json'],
			},
		},
	},
};
