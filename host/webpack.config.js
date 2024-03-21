const { withBaseWebpack } = require('../.webpack');

module.exports =withBaseWebpack({
    devServer: { port: 3000 },
    federationConfig: { name: 'container' },
}, true);