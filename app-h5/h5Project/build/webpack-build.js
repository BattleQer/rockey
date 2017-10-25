const webpackConfig = require('./webpack-config.js'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    utils = require('./utils.js');

module.exports =  merge(webpackConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
});