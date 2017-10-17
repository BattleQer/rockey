const OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpackConfig = require('./webpack.config.js'),
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils.assetsRootPath('index.html'),
            inject: true
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:10001' }),
        new webpack.ProvidePlugin({
            'Config': utils.assetsRootPath('src/config/config.dev.js'),
            'axios': 'axios'
        })
    ]
});