module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'react/jsx-indent': ['error', 4],
		indent: 0,
		'no-tabs': 0,
		'max-len': ['error', { code: 150 }],
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@api', './src/api'],
					['@components', './src/components'],
					['@config', './src/config'],
					['@pages', './src/components/pages'],
					['@utils', './src/utils'],
					['@redux', './src/redux'],
					['@actions', './src/redux/actions'],
					['@reducers', './src/redux/reducers'],
					['@store', './src/redux/store'],
					['@types', './src/redux/types'],
					['@utils', './src/utils'],
					['@styles', './src/styles'],
					['@icons', './src/assets/icons'],
					['@images', './src/assets/images'],
					['@pagestyles', './src/styles/pages'],
					['@constants', './src/constants'],
				],
				extensions: ['.ts', '.js', '.jsx', '.json', '.scss', '.native.js'],
			},
		},
	},
};
