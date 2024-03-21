const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const loaders = require('./loaders');
const defaults = require('./defaults');

/**
 * @param {Object} properties.customConfig Config overrides to pass to the WebPackConfig and ModuleFederationPlugin.
 * @param {boolean} [properties.isTypescript] Whether or not this module uses Typescript.
 */
const withBaseWebpack = (customConfig, isTypescript) => {
	loaders.envLoader();
	return {
		entry: `./src/index.${isTypescript ? 'ts' : 'js'}`,
		mode: process.env.NODE_ENV || 'development',
		devtool:
			(process.env.NODE_ENV || 'development') === 'development'
				? 'inline-source-map'
				: 'source-map',
		devServer: {
			...defaults.defaultDevServer(customConfig.federationConfig.name),
			...customConfig.devServer,
		},
		output: defaults.defaultOutput(customConfig.federationConfig.name),
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			//plugins: [new TsconfigPathsPlugin()],
			alias: {
				'@shared': path.resolve(__dirname, '../shared'),
			},
		},
		ignoreWarnings: [
			{
				module: /src\/styles\/index.scss/,
				message:
					/autoprefixer: start value has mixed support, consider using flex-start instead/,
			},
		],
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: [/node_modules/],
					loader: 'esbuild-loader',
					options: { jsx: 'automatic' },
				},
				{
					test: /\.(sc|c)ss$/,
					exclude: [/\.module.scss$/],
					use: [
						MiniCssExtractPlugin.loader,
						loaders.cssLoader(),
						loaders.postCssLoader,
						loaders.sassLoader,
					],
					sideEffects: true,
				},
				{
					test: /\.module.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						loaders.cssLoader(true),
						loaders.postCssLoader,
						loaders.sassLoader,
					],
					sideEffects: true,
				},
				{ test: /\.(png|svg|jpg|jpeg|mp3)$/, type: 'asset/resource' },
			],
		},
		plugins: [
			new DotenvPlugin({
				systemvars: true,
			}),
			new ModuleFederationPlugin({
				shared: { ...defaults.defaultSharedModules() },
				filename: defaults.defaultRemoteName(),
				...customConfig.federationConfig,
			}),
			new HtmlWebpackPlugin({
				template: './public/index.html',
				favicon: './public/favicon.ico',
				inject: 'body',
			}),
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css',
			}),
		],
	};
};

module.exports = {
	withBaseWebpack,
};