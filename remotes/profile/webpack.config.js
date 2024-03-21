const { withBaseWebpack } = require('../../.webpack');

module.exports = withBaseWebpack({
    devServer: { port: 3003 },
    federationConfig: {
        name: 'remote_profile',
        exposes: {
            './Application': './src/_app',
            './Health': './src/_health',
        }
    },
}, true);