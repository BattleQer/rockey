const http = require('http');
const express = require('express');
const utils = require('./utils.js');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack-dev.js');
const compiler = webpack(webpackConfig);
//app.use(require('morgan')('short'));
(function() {

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
})();

// Do anything you like with the rest of your express application.
app.get("/", function(req, res) {
    res.sendFile(utils.assetsRootPath('src/v1-yk-header.html'));
});

if (require.main === module) {
    var server = http.createServer(app);
    server.listen(2828, '127.0.0.1', function() {
        console.log("Listening on %j", server.address());
    });
}