const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function config(env, argv) {
	const mode = argv && argv.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: {
			app: './src/index.tsx',
		},
		output: {
			filename: 'static/[name].js',
			path: path.resolve(__dirname, 'dist'),
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
			modules: [
				path.resolve(__dirname, 'node_modules'),
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
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: mode === 'development',
								reloadAll: true,
							},
						},
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
				filename: 'static/[name].css',
				chunkFilename: 'static/[id].css',
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
		],
		devtool: 'source-map',
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			port: 8526,
			hot: true,
		},
	};
};
