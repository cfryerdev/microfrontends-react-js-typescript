const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const pkg = require("./package.json");
require("dotenv").config({ path: "./.env" });

var remotes = require("./webpack.remotes.json");

function getRemotesFromConfiguration () {
	let obj = {};
	remotes.forEach((rem) => { obj[rem.name] = `${rem.name}@${rem.url}`; });
	return obj;
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
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
		module: {
			rules: [ 
				{ test: /\.(js|jsx|tsx|ts)$/, loader: "ts-loader", exclude: /node_modules/ },
				{ test: /\.css$/, use: ["style-loader", "css-loader"]}
			],
		},
		plugins: [
			new ModuleFederationPlugin({
				name: "container",
				remotes: getRemotesFromConfiguration(),
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
			}),
		],
	};
};
