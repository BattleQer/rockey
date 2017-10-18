const HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpackConfig = require('./webpack-config.js'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    utils = require('./utils.js');

module.exports =  merge(webpackConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils.assetsRootPath('index.html'),
            inject: true
        }),
        new webpack.ProvidePlugin({
            'Config': utils.assetsRootPath('src/config/config-'+process.env.PRO_ENV+'.js'),
            'axios': 'axios'
        })
    ]
});