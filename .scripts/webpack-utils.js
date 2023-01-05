const fs = require('fs');
const path = require('path');

module.exports = {
    importHostEnv(nodeEnv, filePath = '../../host/.env') {
        if (fs.existsSync(filePath) && nodeEnv === 'development') {
            require('dotenv').config({ path: filePath });
        }
    },
    getSharedModules(sharedDependencies, loadEager, moduleNameWhiteList) {
        let dependency = {};
        Object.keys(sharedDependencies)
            .filter(m => (!moduleNameWhiteList ? true : moduleNameWhiteList.includes(m)))
            .forEach(d => {
                dependency[d] = {
                    singleton: true,
                    eager: !!loadEager,
                    requiredVersion: sharedDependencies[d],
                };
            });
        return dependency;
    },
    getDefaultSharedModules() {
        return [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-helmet',
        ];
    },
    getDefaultOutput() {
        return {
            publicPath: `auto`,
            clean: true,
        }
    },
    createDevServer(port) {
        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
            },
            open: false,
            port: port,
        }
    },
    getDefaultResolve(extensions, sharedPath) {
        return {
            extensions: extensions,
            alias: { '@shared': sharedPath }
        }
    },
    getDefaultExposed() {
        return {
            './Application': './src/_app',
            './Health': './src/_health',
        }
    },
    getRule_Javascript() {
        return {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['@babel/preset-react'],
            },
        }
    },
    getRule_Typescript() {
        return {
            test: /\.(js|jsx|tsx|ts)$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        }
    },
    getRule_Assets() {
        return {
            test: /\.(jpg|png|jpeg|svg)/,
            type: 'asset/resource',
            exclude: /node_modules/,
        }
    },
    getRule_StylesModule(cssLoader) {
        return {
            test: /\.(sa|sc|c)ss$/,
            exclude: /\.module\.scss$/i,
            use: [
                cssLoader,
                { loader: 'css-loader'},
                'postcss-loader',
                'sass-loader',
            ],
        }
    }
};