const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const DotenvPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sharedDependencies = require('../../shared/package.json').dependencies;
const dependencies = require('./package.json').dependencies;
const {
  importHostEnv,
  getDefaultExposed,
  getSharedModules,
  getDefaultSharedModules,
  getDefaultResolve,
  createDevServer,
  getRule_Typescript,
  getRule_Assets,
  getRule_StylesModule,
  getDefaultOutput
} = require('../../.scripts/webpack-utils');

const port = 3003;
const remoteName = 'profile';

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: './src/index.ts',
	devServer: createDevServer(port),
	resolve: {
	  extensions: [".ts", ".tsx", ".js", ".jsx"],
	  alias: {
		'@shared': path.resolve(__dirname, '../../shared')
	  }
	},
	output: getDefaultOutput(),
	module: {
	  rules: [
		getRule_Typescript(),
		getRule_Assets(),
		getRule_StylesModule(MiniCssExtractPlugin.loader),
	  ],
	},
	plugins: [
	  new ModuleFederationPlugin({
		name: `remote_${remoteName}`,
		filename: 'remote.js',
		exposes: getDefaultExposed(),
		shared: {
				  ...getSharedModules(dependencies, false, getDefaultSharedModules()),
		  ...getSharedModules(sharedDependencies),
		},
	  }),
	  new DotenvPlugin({
		systemvars: true,
	  }),
	  new HtmlWebpackPlugin({
		template: './public/index.html',
	  }),
	  new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
	}),
	],
  };
  

// module.exports = {
// 	mode: nodeEnv,
// 	entry: "./src/index.ts",
// 	devServer: {
// 		headers: {
// 			"Access-Control-Allow-Origin": "*",
// 			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
// 		},
// 		port: port,
// 		open: false,
// 	},
// 	resolve: {
// 		extensions: [".ts", ".tsx", ".js", ".jsx"],
// 		alias: {
// 			'@shared': path.resolve(__dirname, '../../shared')
// 		}
// 	},
// 	output: {
// 		publicPath: `http://localhost:${port}/`,
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx|tsx|ts)$/,
// 				loader: "ts-loader",
// 				exclude: /node_modules/,
// 			},
// 			{
// 				test: /\.(jpg|png|jpeg|svg)/,
// 				type: 'asset/resource',
// 				exclude: /node_modules/,
// 			},
// 			{
// 				test: /\.(sa|sc|c)ss$/,
// 				exclude: /\.module\.scss$/i,
// 				use: [
// 					MiniCssExtractPlugin.loader,
// 					{
// 						loader: 'css-loader',
// 						options: {
// 							importLoaders: 1,
// 							import: true,
// 							modules: {
// 								mode: 'local',
// 								auto: true,
// 								exportGlobals: true,
// 								localIdentName:
// 									nodeEnv === 'development'
// 										? '[local]-[hash:base64:5]'
// 										: '[hash:base64]',
// 								localIdentContext: path.resolve(__dirname, 'src'),
// 								localIdentHashSalt: path.resolve(__dirname),
// 							},
// 						},
// 					},
// 					'postcss-loader',
// 					'sass-loader',
// 				],
// 			},
// 		]
// 	},
// 	plugins: [
// 		new ModuleFederationPlugin({
// 			name: `remote_${remoteName}`,
// 			filename: 'remote.js',
// 			exposes: {
// 				'./Application': './src/_app',
// 				'./Health': './src/_health',
// 			},
// 			shared: {
// 				...deps,
// 				'react': {
// 					singleton: true,
// 					requiredVersion: deps.react,
// 				},
// 				'react-dom': {
// 					singleton: true,
// 					requiredVersion: deps['react-dom'],
// 				},
// 			},
// 		}),
// 		new HtmlWebpackPlugin({
// 			template: "./public/index.html",
// 		}),
// 	],
// };
