'use strict';
const utils = require('./utils.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        vendor: ['babel-polyfill'],
        main: [utils.assetsRootPath('src/js/main.js')],
        index: [utils.assetsRootPath('src/js/index.js')],
        common: [utils.assetsRootPath('src/common.js')]
    },
    output: {
        path: utils.assetsRootPath('dist'),
        filename: './js/[name].js',
        chunkFilename: './js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': utils.assetsRootPath('src'),
            'vue': 'vue/dist/vue.js',
            'app': utils.assetsRootPath('src/js/app.js'),

        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: utils.assetsRootPath('src'),
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("css-loader")
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("sass-loader")
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: './image/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: './media/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: './fonts/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils.assetsRootPath('src/v1-yk-header.html'),
            inject: true,
            chunks: ['vendor', 'main', 'index', "common"]
        }),
        new HtmlWebpackPlugin({
            filename: 'v1-yk-header.html',
            template: utils.assetsRootPath('src/v1-yk-header.html'),
            inject: true,
            chunks: ['vendor', 'main', 'index']
        }),
        new ExtractTextPlugin("css/[name].css"), //生成的css样式文件
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            'Config': utils.assetsRootPath('src/config/config-' + process.env.PRO_ENV + '.js'),
            $: 'jquery',
        })
    ]
};