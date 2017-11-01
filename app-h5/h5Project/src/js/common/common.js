require("../../css/common.css");
import vue from "vue"
$( "#radio" ).buttonset();

var app = new vue({
    el: '#content',
    data: {
   
    },
    mounted: function() {
 
    },
    methods: {
        ajaxq: function ajax(url, param, type,status,flag) {
            // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
            // 如果需要的参数更多，比如有跨域dataType需要设置为'jsonp'等等，也可以不做这一层封装，还是根据工程实际情况判断吧，重要的还是链式回调
            // status 作为跨越和不跨域的处理 crossDomain 是否以文本流形式
            return $.ajax({
                url: url,
                data: param || {},
                type: type || 'GET',
                dataType: status || "jsonp" ,
                jsonp: "callback",
                crossDomain: true
            });
        },
        handleAjax: function(url, param, type,status,flag) {
            return this.ajaxq(url, param, type,status,flag).then(function(resp) {
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
$( "#radio" ).buttonset();