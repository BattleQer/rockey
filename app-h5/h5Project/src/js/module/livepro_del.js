require("../../css/page/live/live.css");
require("../../css/common/swiper/swiper-3.4.2.min.css");
var swiper = new Swiper('.banner .swiper-container', {
    loop: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
});
var swiper = new Swiper('.artist_logo .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    grabCursor: true,
    paginationClickable: true,
    loop: true,
});