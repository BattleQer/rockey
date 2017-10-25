'use strict';
const utils = require('./utils.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['babel-polyfill'],
        index: [utils.assetsRootPath('src/js/main.js')]
    },
    output: {
        path: utils.assetsRootPath('dist'),
        filename: './js/[name]-[hash:7].js',
        chunkFilename: './js/[name]-[hash:7].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': utils.assetsRootPath('../src'),
            'vue': 'vue/dist/vue.js',
            'app': utils.assetsRootPath('src/js/app'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: utils.assetsRootPath('src'),
            },
            {
                test: /\.css$/,
                loaders: ['style-loader','css-loader']
            },
            {
                test: /\.(styl|stylus)$/,
                loaders: [ 'style-loader','css-loader','stylus-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: './image/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: './media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: './fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'v1-yk-header.html',
            template: 'v1-yk-header.html',
            inject: true,
            chunks: ['vendor','index']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            'Config': utils.assetsRootPath('src/config/config-'+process.env.PRO_ENV+'.js'),
        })
    ]
};
