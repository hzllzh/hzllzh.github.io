(function () {
    //轮播图的数据
    var carouselDatas = [{
            image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
        },
        {
            image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
        },
    ];
    createCarousel("gameCarousel", carouselDatas);

    var container = $(".game_container");

    container.ontouchstart = function(e){
        console.log(container.scrollTop);
        if(container.scrollTop >= 10){ //滑动条的位置
            //滑动的位置已经不在顶部了
            e.stopPropagation();//阻止事件冒泡
        }
    };
})();