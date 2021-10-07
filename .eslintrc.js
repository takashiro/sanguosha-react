module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'func-names': 'off',
		'linebreak-style': 'off',
		indent: [
			'error',
			'tab',
		],
		'jsx-a11y/control-has-associated-label': 'off',
		'max-len': 'off',
		'no-console': 'off',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'no-restricted-syntax': [
			'error',
			'WithStatement',
		],
		'no-shadow': 'off',
		'no-tabs': 'off',
		'no-use-before-define': 'off',
		'prefer-arrow-callback': 'off',
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: [
					'.js',
					'.jsx',
				],
			},
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
	},
	settings: {
		'import/resolver': { typescript: {} },
	},
};
