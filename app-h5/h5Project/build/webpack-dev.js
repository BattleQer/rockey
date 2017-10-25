const OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    webpackConfig = require('./webpack-config.js'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    utils = require('./utils.js');

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    entry: {
        index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:10001' }),
    ]
});