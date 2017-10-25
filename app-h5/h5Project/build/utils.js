path = require('path');
module.exports = {
    assetsRootPath : function  (dir) { //根目录
        return path.join(__dirname, '../', dir)
    }
};