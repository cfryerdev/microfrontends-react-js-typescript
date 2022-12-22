const env = require('dotenv').config();
const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const pkg = require("./package.json");
require("dotenv").config({ path: "./.env" });

if (env && env.parsed) {
	console.log('environment config:', env.parsed);
}

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
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
			alias: {
				'@shared': path.resolve(__dirname, '../shared')
			}
		},
		module: {
			rules: [
				{ test: /\.(js|jsx|tsx|ts)$/, loader: "ts-loader", exclude: /node_modules/ },
				{ test: /\.(css|scss|sass)$/, use: ["style-loader", "css-loader"] }
			],
		},
		plugins: [
			new DotenvPlugin({
				systemvars: true,
			}),
			new ModuleFederationPlugin({
				name: "container",
				remotes: [], // Loaded dynamically now via api ;)
				shared: {
					...pkg.dependencies,
					react: { singleton: true, eager: true, requiredVersion: pkg.dependencies["react"] },
					"react-dom": {
						singleton: true,
						eager: true,
						requiredVersion: pkg.dependencies["react-dom"],
					},
				},
			}),
			new HtmlWebpackPlugin({
				template: "./public/index.html",
				favicon: './public/favicon.ico',
			}),
		],
	};
};
