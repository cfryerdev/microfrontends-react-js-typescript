const fs = require('fs');

/** Minimal configuration for css loader */
const cssLoader = (hasCssModules = false) => {
    const cssLoaderConfig = {
        loader: 'css-loader',
        options: {
            sourceMap: true,
        },
    };
    if (hasCssModules) {
        cssLoaderConfig.options.modules = true;
        cssLoaderConfig.options.importLoaders = 2;
    }
    return cssLoaderConfig;
};

/** Minimal configuration for postcss loader */
const postCssLoader = {
    loader: 'postcss-loader',
    options: { sourceMap: true },
};

/** Minimal configuration for sass loader */
const sassLoader = {
    loader: 'sass-loader',
    options: {
        sassOptions: { quietDeps: true },
        sourceMap: true,
    },
};

const envLoader = () => {
    const filePath = '../../host/.env';
    if (fs.existsSync(filePath) && process.env.NODE_ENV === 'development') {
        require('dotenv').config({ path: filePath });
    } else {
        require('dotenv').config();
    }
}

module.exports = {
    cssLoader,
    postCssLoader,
    sassLoader,
    envLoader
}