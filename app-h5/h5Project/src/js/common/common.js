require("../../css/common.css");
import vue from "vue"
var app = new vue({
    el: '#root',
    data: {

    },
    mounted: function() {
        console.log("vue")
    },
    methods: {
        ajaxq: function ajax(url, param, type) {
            // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
            // 如果需要的参数更多，比如有跨域dataType需要设置为'jsonp'等等，也可以不做这一层封装，还是根据工程实际情况判断吧，重要的还是链式回调
            return $.ajax({
                url: url,
                data: param || {},
                type: type || 'GET',
                dataType: "jsonp",
                jsonp: "callback",
                crossDomain: true
            });
        },
        handleAjax: function(url, param, type) {
            return this.ajaxq(url, param, type).then(function(resp) {
                // 成功回调 不作逻辑处理
                if (resp) {
                    return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
                } else {
                    return $.Deferred().reject(resp.msg); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
                }
            }, function(err) {
                // 失败回调 不作逻辑处理
                console.log(err.status); // 打印状态码
            });
        },
    }
})