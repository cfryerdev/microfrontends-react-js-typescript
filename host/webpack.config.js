const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const pkg = require("./package.json");
require("dotenv").config();

function getRemotesFromConfiguration () {
	let obj = {};
	var remotes = Object.entries(process.env);
	remotes.forEach((rem) => { 
		if (rem[0].startsWith('REMOTE_')) {
			var name = rem[0].toLowerCase();
			var url = rem[1];
			obj[name] = `${name}@${url}`; 
		}
	});
	return obj;
};

function getSharedDependencies() {
	const sharedPkg = require("../shared/package.json");
    let dependency = {};
    Object.keys(sharedPkg.dependencies).forEach(dep => {
        dependency[dep] = {
            singleton: true,
            requiredVersion: sharedPkg.dependencies[dep],
        };
    });
    return dependency;
};

module.exports = (env, argv) => {
	return {
		entry: "./src/index.ts",
		output: {
			publicPath: '/'
		},
		mode: process.env.NODE_ENV || "development",
		devServer: {
			port: 3000,
			open: true,
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': '*',
			},
		},
		devtool: 'source-map',
		output: {
			publicPath: 'auto',
			clean: true,
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
			plugins: [new TsconfigPathsPlugin()],
			alias: {
				'@shared': path.resolve(__dirname, '../shared')
			}
		},
		module: {
			rules: [ 
				{ test: /\.(js|jsx|tsx|ts)$/, loader: "ts-loader", exclude: /node_modules/, options: { rootMode: 'upward' }},
				{ test: /\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader, "style-loader", "postcss-loader", "css-loader", "sass-loader" ]},
				{ test: /\.(jpg|png|jpeg)/, type: 'asset/resource', },
			],
		},
		plugins: [
			new DotenvPlugin({
				systemvars: true,
			}),
			new ModuleFederationPlugin({
				name: "container",
				remotes: getRemotesFromConfiguration(),
				shared: {
					...pkg.dependencies,
					...getSharedDependencies(),
					'react': {
						singleton: true,
						eager: true,
						requiredVersion: pkg.dependencies['react'],
					},
					'react-dom': {
						singleton: true,
						eager: true,
						requiredVersion: pkg.dependencies['react-dom'],
					},
					'react-router-dom': {
						singleton: true,
						requiredVersion: pkg.dependencies['react-router-dom'],
					},
				},
			}),
			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
		],
	};
};
