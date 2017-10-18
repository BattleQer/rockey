'use strict';
const utils = require('./utils.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['babel-polyfill','element-ui','axios','vue-router','vuex'],
        index: [utils.assetsRootPath('src/main.js')]
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
            '@': utils.assetsRootPath('src'),
            'vue': 'vue/dist/vue.js',
            'containers': utils.assetsRootPath('src/containers'),
            'components': utils.assetsRootPath('src/components'),
            'render': utils.assetsRootPath('src/render'),
            'styles-var': utils.assetsRootPath('src/assets/styles/variables.styl'),
            'commond-var': utils.assetsRootPath('src/assets/styles/commond.styl'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader',
                }
            },
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
            filename: 'index.html',
            template: utils.assetsRootPath('index.html'),
            inject: true,
            chunks: ['vendor','index']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            'Config': utils.assetsRootPath('src/config/config-'+process.env.PRO_ENV+'.js'),
            'axios': 'axios'
        })
    ]
};
