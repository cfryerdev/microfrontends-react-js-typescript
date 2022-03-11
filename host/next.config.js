/** @type {import('next').NextConfig} */

var remotes = require("./next.remotes.json");

const getRemotesFromConfiguration = () => {
  let obj = {};
  remotes.forEach((rem) => { obj[rem.name] = rem.name; });
  return obj;
};

module.exports = {
  webpack: (config, options) => {
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        remoteType: "var",
        remotes: getRemotesFromConfiguration(),
        shared: {
          'react': {
            eager: true,
            singleton: true,
            requiredVersion: false,
          }
        },
      })
    );

    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    return config;
  },
}