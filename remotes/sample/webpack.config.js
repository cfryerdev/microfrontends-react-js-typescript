const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

const port = 3002;
const remoteName = 'sample';

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    },
		open: false,
    port: port,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      '@shared': path.resolve(__dirname, '../../shared')
    }
  },
  output: {
    publicPath: `auto`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(jpg|png|jpeg|svg)/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
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
          requiredVersion: deps['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
