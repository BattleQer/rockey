require("../../css/page/mv/mv.css");
var playerEl = document.getElementById("player");
var player = new Clappr.Player({
    source: "http://jq22.qiniudn.com/jq22com.mp4",
    mute: true,
    autoPlay: true,
    height: "9.00267rem",
    width: "100%"
});

player.attachTo(playerEl);