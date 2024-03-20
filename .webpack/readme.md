# New Minimal Webpack Config
Our new minimal webpack has some notable changes within. First off, its no longer powered by babe, swc, or ts-loader... We use esbuild and esbuild-loader to achieve some important gains. No longer do we need to differentiate between jsx and tsx in our bundler configuration, we have much better bundle and chunk size handling, better tree-shaking of module dependencies, and a faster build system.

## Example webpack.config.js

```js
const { withBaseWebpack } = require('../../.webpack');
const webpackConfig = withBaseWebpack({
    devServer: { port: 3001 },
    federationConfig: {
        name: 'remote_home',
        exposes: {
            './Application': './src/_app',
            './Health': './src/_health',
        }
    },
}, true); // Toggle for typescript handling
module.exports = { ...webpackConfig };
```

# Upgrading to new minimal Webpack config

To upgrade to the new version of our minimal webpack bundler, you merely need to take three small steps.
- Copy `.webpack` folder into your repository
- Replace your host and remote webpack config files with the example above.

From there you can simply, `pnpm i` and then `pnpm start`.

Enjoy!