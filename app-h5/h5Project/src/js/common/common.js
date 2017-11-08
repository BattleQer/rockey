require("../../css/common/common.css")
import vue from "vue"
import NativeShare from 'nativeshare'
require("jqueryui");
// 兼容性
! function(e) {
    function h() {
        var a = f.getBoundingClientRect().width;
        640 < a / b && (a = 640 * b);
        a /= 16;
        f.style.fontSize = a + "px";
        e.rem = a
    }

    function k(a, b, c, e) {
        var d;
        return function() {
            var f = e || this,
                g = arguments,
                h = c && !d;
            clearTimeout(d);
            d = setTimeout(function() {
                d = null;
                c || a.apply(f, g)
            }, b);
            h && a.apply(f, g)
        }
    }
    var b, a, d, c = e.document,
        g = e.navigator,
        f = c.documentElement,
        i = c.querySelector('meta[name="viewport"]');
    d = c.querySelector('meta[name="flexible"]');
    i ? (d = i.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/)) && (a = parseFloat(d[2]), b = parseInt(1 / a)) : d && (d = d.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/)) && (b = parseFloat(j[2]), a = parseFloat((1 / b).toFixed(2)));
    !b && !a && (b = e.devicePixelRatio, b = g.appVersion.match(/android/gi) || g.appVersion.match(/iphone/gi) ? 3 <= b ? 3 : 2 <= b ? 2 : 1 : 1, a = 1 / b);
    f.setAttribute("data-dpr", b);
    i || (a = '<meta name="viewport" content="width=device-width, initial-scale=' + a + ", maximum-scale=" + a + ", minimum-scale=" + a + ', user-scalable=no" />', f.firstElementChild ? (g = c.createElement("div"), g.innerHTML = a, f.firstElementChild.appendChild(g.firstChild)) : c.write(a));
    e.dpr = b;
    e.addEventListener("resize", k(h, 50), !1);
    e.addEventListener("pageshow", k(function(a) {
        a.persisted && h()
    }, 300), !1);
    "complete" === c.readyState ? c.body.style.fontSize = 12 * b + "px" : c.addEventListener("DOMContentLoaded", function() {
        c.body.style.fontSize = 12 * b + "px"
    }, !1);
    h()
}(window);
//end 
$("#radio").buttonset();
var app = new vue({
    el: '#content',
    data: {
        com_list: [{
            img: "1111",
            acc: "小甜甜的你",
            time: "2017-09-28",
            love: "3454",
            descrobe: "爱上迪欧hi欧委会去哦我12321312312312312312和日期我我哈熟地黄赛欧阿萨德撒回到拉萨好多了开啥店库里和所有表情最爱发这个的同学举个爪"
        }, {
            img: "1111",
            acc: "小甜甜的你",
            time: "2017-09-28",
            love: "3454",
            descrobe: "爱上迪欧hi欧委会去哦我12321312312312312312和日期我我哈熟地黄赛欧阿萨德撒回到拉萨好多了开啥店库里和所有表情最爱发这个的同学举个爪"
        }, {
            img: "1111",
            acc: "小甜甜的你",
            time: "2017-09-28",
            love: "3454",
            descrobe: "爱上迪欧hi欧委会去哦我12321312312312312312和日期我我哈熟地黄赛欧阿萨德撒回到拉萨好多了开啥店库里和所有表情最爱发这个的同学举个爪"
        }, {
            img: "1111",
            acc: "小甜甜的你",
            time: "2017-09-28",
            love: "3454",
            descrobe: "爱上迪欧hi欧委会去哦我12321312312312312312和日期我我哈熟地黄赛欧阿萨德撒回到拉萨好多了开啥店库里和所有表情最爱发这个的同学举个爪"
        }, {
            img: "1111",
            acc: "小甜甜的你",
            time: "2017-09-28",
            love: "3454",
            descrobe: "爱上迪欧hi欧委会去哦我12321312312312312312和日期我我哈熟地黄赛欧阿萨德撒回到拉萨好多了开啥店库里和所有表情最爱发这个的同学举个爪"
        }],
        mvList: [{
            title: "说你也一样爱着我",
            user: "张栋梁"
        }, {
            title: "大男人情歌",
            user: "梁汉文"
        }]
    },
    mounted: function() {

    },
    methods: {
        ajaxq: function ajax(url, param, type, status, flag) {
            // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
            // 如果需要的参数更多，比如有跨域dataType需要设置为'jsonp'等等，也可以不做这一层封装，还是根据工程实际情况判断吧，重要的还是链式回调
            // status 作为跨越和不跨域的处理 crossDomain 是否以文本流形式
            return $.ajax({
                url: url,
                data: param || {},
                type: type || 'GET',
                dataType: status || "jsonp",
                jsonp: "callback",
                crossDomain: true
            });
        },
        handleAjax: function(url, param, type, status, flag) {
            return this.ajaxq(url, param, type, status, flag).then(function(resp) {
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