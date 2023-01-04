const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

const port = 3003;
const remoteName = 'profile';

module.exports = {
	entry: "./src/index.ts",
	mode: "development",
	devServer: {
		headers: {
		  "Access-Control-Allow-Origin": "*",
		  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
		},
		port: port,
		open: false,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			'@shared': path.resolve(__dirname, '../../shared')
		}
	},
	output: {
		publicPath: `http://localhost:${port}/`,
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
			name: `remote_${remoteName}`,
			filename: 'remote.js',
			exposes: {
				'./Application': './src/_app',
				'./Health': './src/_health',
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
