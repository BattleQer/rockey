'use strict';
const utils = require('./utils.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack');
var srcDir = path.resolve(process.cwd(), 'src');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//引入glob
var glob = require('glob')
    //js抽离
var entries = function() {
        var jsDir = path.resolve(srcDir, 'js')
        var entryFiles = glob.sync(jsDir + '/common/*.{js,jsx}')
        var otherFiles = glob.sync(jsDir + '/module/*.{js,jsx}')
        for (var i = 0; i < otherFiles.length; i++) {
            entryFiles.push(otherFiles[i])
        }
        var map = {};

        for (var i = 0; i < entryFiles.length; i++) {
            var filePath = entryFiles[i];
            var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            map[filename] = filePath;
        }
        return map;
    }
    // html抽离
function getView(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);

        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = basename;
    }
    return entries;
}
var config = {
    entry: Object.assign(entries(), {
        vendor: ['babel-polyfill'],
        common: utils.assetsRootPath('src/js/common/common.js'),
    }),
    output: {
        path: path.join(__dirname, "dist"),
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
            'jqueryui': utils.assetsRootPath('src/js/common/jqueryui.js'),
            'nativeshare': utils.assetsRootPath('src/js/common/nativeShare.js')
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
                loader: 'file-loader',
                options: {
                    limit: 1,
                    name: './song/[name].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
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
            }
            // ,{
            //     test: /\.ejs$/,
            //     loader: 'ejs-loader',
            // } ,
            // {
            //     test: /\.tpl$/,
            //     loader: 'ejs-compiled-loader',
            // } 
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils.assetsRootPath('src/v1-yk-header.html'),
            inject: "body",
            hash: true,
            chunks: ['vendor', 'common']
        }),
        new ExtractTextPlugin("css/[name].css"), //生成的css样式文件
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            'Config': utils.assetsRootPath('src/config/config-' + process.env.PRO_ENV + '.js'),
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
};
var viesObj = getView('src/html/*.html', 'src/html/');
var pages = Object.keys(viesObj);

pages.forEach(function(pathname) {
    var htmlName = viesObj[pathname]
    var conf = {
        filename: './html/' + htmlName + '.html', //生成的html存放路径，相对于path
        template: './src/html/' + htmlName + '.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        chunks: ["vendor", "common", htmlName], //需要引入的chunk，不配置就会引入所有页面的资源
        minify: { //压缩HTML文件    
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
})

module.exports = config;