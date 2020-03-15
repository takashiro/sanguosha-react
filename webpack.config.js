const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function config(env, argv) {
	const mode = argv && argv.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: {
			app: './src/index.tsx',
			vendor: [
				'react',
				'react-dom',
				'@karuta/client',
				'@karuta/sanguosha-core',
				'@karuta/sanguosha-ai',
			],
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist/static'),
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /node_modules/,
						name: 'vendor',
						enforce: true,
						chunks: 'all',
					},
				},
			},
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
				'.jsx',
			],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/i,
					exclude: /node_modules/,
					use: 'ts-loader',
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								sourceMap: mode === 'development',
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: mode === 'development',
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
		],
		devtool: mode === 'production' ? undefined : 'source-map',
	};
};
