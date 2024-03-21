/** Default minimal shared modules for module federation */
const defaultSharedModules = () => {
	return {
		react: {
			singleton: true,
			strictVersion: true,
			requiredVersion: '18.2.0',
		},
		'react-dom': {
			singleton: true,
			strictVersion: true,
			requiredVersion: '18.2',
		},
		'react-router': {
			singleton: true,
			strictVersion: true,
			requiredVersion: '6.22',
		},
		'react-router-dom': {
			singleton: true,
			strictVersion: true,
			requiredVersion: '6.22',
		},
		'@tanstack/react-query': {
			singleton: true,
			strictVersion: true,
			requiredVersion: '5.24',
		},
	};
};

/** Default output for webpack chunks and modules */
const defaultOutput = (remoteName) => {
	return {
		publicPath: remoteName === 'container' ? '/' : 'auto',
		chunkFilename: '[name].[contenthash].js',
		filename: '[name].[contenthash].js',
		assetModuleFilename: '[name].[contenthash][ext][query]',
		clean: true,
	};
};

/** Default configuration for webpack dev server */
const defaultDevServer = (remoteName) => {
	return {
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
		},
		open: remoteName === 'container' ? true : false,
	};
};

const defaultRemoteName = () => {
	return 'remote.js';
};

module.exports = {
	defaultSharedModules,
	defaultDevServer,
	defaultOutput,
	defaultRemoteName,
};