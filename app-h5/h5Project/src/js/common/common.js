require("../../css/common/common.css")

const vue = require("vue")
const NativeShare = require('nativeshare')
require("jqueryui");
// 关闭下载按钮
    $(".down_close").click(function(){
        $(".download_bottom,.download_backup").css('display','none');
    })
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
var url_title="http://192.168.30.12:8091/group-app/music/";
var h5_inter_url = {
    getAlbum : url_title + 'home/',
    getMusicList : url_title + 'album/detail',
    getMusic : url_title + 'detail',
    getMvDetail : url_title + 'mv/detail'
}
$("#radio").buttonset();
var app = new vue({
        el: '#content',
        data: {
            live_list: [{
                id: "东皇太一",
                con: "禁锢"
            }, {
                id: "嬴政",
                con: "射射射"
            }, {
                id: "诸葛亮",
                con: "被动"
            }, {
                id: "娜扎",
                con: "飞大"
            }, {
                id: "马可波罗",
                con: "陈豪"
            }, {
                id: "杨戬",
                con: "放狗"
            }, {
                id: "猴子",
                con: "花果山水帘洞齐天大圣孙悟空啊，型到掉渣"
            }, {
                id: "蔡文姬",
                con: "！￥！@￥！@%！@%#……￥#……￥#……￥#&#￥&！#￥&#￥！&！￥#&#！&！#￥￥#&%！@#@！#@！#！@#！@￥！@！#！"
            }, {
                id: "钟馗",
                con: "神钩"
            }, {
                id: "大乔",
                con: "传送"
            }, {
                id: "不知火舞",
                con: "跳舞"
            }, {
                id: "甄姬",
                con: "玩冰"
            }, {
                id: "刘邦",
                con: "千里太保"
            }, {
                id: "韩信",
                con: "跳跳虎"
            }, {
                id: "曹操",
                con: "坐板凳"
            }, {
                id: "花木兰",
                con: "削成狗"
            }, {
                id: "凯",
                con: "撞撞撞"
            }, {
                id: "苏烈",
                con: "顶顶顶"
            }, ],
            albumList: [],
            album:{},
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
            mvList: [],
            mv_detail:{},
            mv_comment:[]
        },
        mounted: function() {
            var self = this;
            let params = {
                id:"6335795956822310915"
            }
            self.handleAjax(h5_inter_url.getMusicList,params,"get").done(function(resp){
                let musicList = resp.data;
                app.albumList = musicList.musics;
                app.album.count = musicList.musics.length +"首";
                app.album.name = musicList.name;

            });
            self.handleAjax(h5_inter_url.getMvDetail,{id:1},'get').done(function(resp){
                let musicList = resp.data;
                app.mvList = musicList.recommendMvs;
                setTimeout(function(){
                    app.mvList.forEach(function(item,index){
                        console.log(item.cover)
                        $(".mv:eq("+index+")").css("background-image",'url('+item.cover+')')
                    })
                    // $(".singer_img").css("background-image","url("+img+")")
                })
                app.mv_detail.views = musicList.views + "次播放";
                app.mv_detail.name = musicList.name;
                app.mv_detail.singer = musicList.singer;
                app.mv_detail.putawayTime = musicList.putawayTime;
                app.mv_comment = musicList.commentList;
                var img = musicList.singerAvatar;
                console.log(img);
            });

        },
        methods: {
            ajaxq: function(url, param, type, status, flag) {
                // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
                // 如果需要的参数更多，比如有跨域dataType需要设置为'jsonp'等等，也可以不做这一层封装，还是根据工程实际情况判断吧，重要的还是链式回调
                // status 作为跨越和不跨域的处理 crossDomain 是否以文本流形式
                return $.ajax({
                    url: url,
                    data: param || {},
                    type: type || 'POST',
                    dataType: status || "json",
                    // jsonp: "callback",
                    // crossDomain: true
                });
            },
            handleAjax: function(url, param, type, status, flag) {
                return this.ajaxq(url, param, type, status, flag).then(function(resp) {
                    // 成功回调 不作逻辑处理
                    if (resp) {
                        return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
                    } else {
                        return $.Deferred().reject(resp.msg); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
                    }e
                }, function(err) {
                    // 失败回调 不作逻辑处理
                    console.log(err.status); // 打印状态码
                });
            },

        }
    })
    // 
var w, h, className;

function getSrceenWH() {
    w = $(window).width();
    h = $(window).height();
    $('#dialogBg').width(w).height(h);
}
Object.showDialog = function(arg) {
    arg.click(function() {
        $('html,body').css("overflow", "hidden");
        // $('body').css("overflow", "hidden");
        className = $(this).attr('class');
        $('#dialogBg').fadeIn(300);
        $('#dialog').removeAttr('class').addClass('animated ' + className + '').fadeIn();
    });
}

window.onresize = function() {
    getSrceenWH();
}
$(window).resize();
`   `
-
$(function() {
    getSrceenWH();
    //关闭弹窗
    $('.claseDialogBtn').click(function() {
        $('html,body').css("overflow", "auto");
        // $('body').css("overflow", "auto");
        $('#dialogBg').fadeOut(300, function() {
            $('#dialog').addClass('bounceOutUp').fadeOut();
        });
    });

});