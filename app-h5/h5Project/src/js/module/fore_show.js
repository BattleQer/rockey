require("../../css/page/foreshow/foreshow.css");
require("../../css/common/swiper/swiper-3.4.2.min.css");
var swiper = new Swiper('.artist_logo .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    grabCursor: true,
    paginationClickable: true,
    loop: true,
});