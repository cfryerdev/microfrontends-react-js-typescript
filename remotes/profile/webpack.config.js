const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	mode: "development",
	devServer: {
		port: 3003,
		open: true,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	output: {
		publicPath: 'http://localhost:3003/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		]
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "remote_profile",
			filename: 'remote.js',
			exposes: {
        './Application': './src/_app',
      },
			shared: {
				...deps,
				'react': {
					singleton: true,
					requiredVersion: deps.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: deps['react-dom'],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
