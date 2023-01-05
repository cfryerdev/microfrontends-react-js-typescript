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
  getRule_Javascript,
  getRule_Assets,
  getRule_StylesModule,
  getDefaultOutput
} = require('../../.scripts/webpack-utils');

const port = 3002;
const remoteName = 'sample';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  devServer: createDevServer(port),
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      '@shared': path.resolve(__dirname, '../../shared')
    }
  },
  output: getDefaultOutput(),
  module: {
    rules: [
      getRule_Javascript(),
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
