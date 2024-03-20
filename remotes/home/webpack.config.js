const { withBaseWebpack } = require('../../.webpack');

module.exports = withBaseWebpack({
    devServer: { port: 3001 },
    federationConfig: {
        name: 'remote_home',
        exposes: {
            './Application': './src/_app',
            './Health': './src/_health',
        }
    },
}, true);