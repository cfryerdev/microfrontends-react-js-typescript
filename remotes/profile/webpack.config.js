const { ModuleFederationPlugin } = require('webpack').container;
const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");
const pkg = require("./package.json").dependencies;

function getSharedDependencies() {
	const sharedPkg = require("../../shared/package.json");
    let dependency = {};
    Object.keys(sharedPkg.dependencies).forEach(dep => {
        dependency[dep] = {
            singleton: true,
            requiredVersion: sharedPkg.dependencies[dep],
        };
    });
    return dependency;
};

module.exports = {
	entry: "./src/index.ts",
	mode: process.env.NODE_ENV || 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        port: 3003,
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
			'@shared': path.resolve(__dirname, '../../shared')
		}
	},
	output: {
		publicPath: 'http://localhost:3003/',
	},
	module: {
		rules: [
			{ test: /\.(js|jsx|tsx|ts)$/, loader: "ts-loader", exclude: /node_modules/, options: { rootMode: 'upward' }},
			{ test: /\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader, "style-loader", "postcss-loader", "css-loader", "sass-loader" ]},
			{ test: /\.(jpg|png|jpeg)/, type: 'asset/resource', },
		]
	},
	plugins: [
		new DotenvPlugin({
            systemvars: true,
        }),
		new ModuleFederationPlugin({
			name: "remote_profile",
			filename: 'remote.js',
			exposes: {
				'./Application': './src/_app',
      		},
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
