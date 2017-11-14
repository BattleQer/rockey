require("../../css/page/video/video.css");
// import Clappr from 'clappr';
var playerEl = document.getElementById("player");

// 判断各种浏览器，找到正确的方法
function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

var player = new Clappr.Player({
    source: "http://jq22.qiniudn.com/jq22com.mp4",
    mute: true,
    autoPlay: true,
    height: "9.00267rem",
    width: "100%",
    events: {
        onReady: function() {
            // console.log($("video")[0]);
            // launchFullScreen($("video")[0]); // 某个页面元素
            console.log(window.screen);
            window.screen.orientation.type = "landscape-primary";
            // window.screen.lockOrientation(["landscape-primary", "landscape-secondary"]);
        },
        onPlay: function() {
            window.screen.orientation.angel = 90;
            console.log("onPlay")
        }
    }
});

player.attachTo(playerEl);
$(function() {
    var className;
    //显示弹框
    Object.showDialog($('.down_top'));
})