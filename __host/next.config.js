/** @type {import('next').NextConfig} */

var remotes = require("./next.remotes.json");
var url_rewrites = require("./next.rewrites.json");

function getRemotesFromConfiguration () {
  let obj = {};
  remotes.forEach((rem) => { obj[rem.name] = `${rem.name}@${rem.url}`; });
  return obj;
};

module.exports = {
  async rewrites() { return url_rewrites },
  
  webpack: (config, options) => {
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        name: "host",
        //remoteType: "var",
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
};
