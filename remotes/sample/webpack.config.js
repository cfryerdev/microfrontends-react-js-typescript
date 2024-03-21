const { withBaseWebpack } = require('../../.webpack');

module.exports = withBaseWebpack({
    devServer: { port: 3002 },
    federationConfig: {
        name: 'remote_sample',
        exposes: {
            './Application': './src/_app',
            './Health': './src/_health',
        }
    },
}, true);