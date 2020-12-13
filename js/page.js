var showPage = (function () {

    var pageIndex = 0; //当前的页面索引
    var pages = $$(".page_container .page"); //拿到所有的页面元素
    var nextIndex = null; //下一个页面的索引
    /* 
        设置静止状态下的各种样式
    */


    function setStatic() {
        nextIndex = null; // 静止页面下没有下一个页面
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]; //一个页面一个页面去设置
            if (i === pageIndex) {
                //目前显示的页面
                page.style.zIndex = 1;
            } else {
                page.style.zIndex = 10;
            }
            page.style.top = (i - pageIndex) * height() + "px";
        }
    }


    /* 
        移动中
        @parm {*} dis 移动的相对量（相对正确位置）
    */
    setStatic();

    function moving(dis) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]; //一个页面一个页面去设置
            if (i !== pageIndex) { //不是当前选中的页面的时候
                page.style.top = (i - pageIndex) * height() + dis + "px"; //重新设置页面
            }
        }
        //设置下一个页面
        if (dis > 0 && pageIndex > 0) {
            //往下在移动，同时，目前不是第一页
            nextIndex = pageIndex - 1;
        } else if (dis < 0 && pageIndex < pages.length - 1) {
            //往上在移动，同时，目前不是最后一页
            nextIndex = pageIndex + 1;
        } else {
            nextIndex = null;
        }
    }


    function finishMove() {
        if (nextIndex === null) {
            //没有下一个
            setStatic();
            return;
        }
        var nextPage = pages[nextIndex];
        nextPage.style.transition = "0.5s";
        nextPage.style.top = 0;

        setTimeout(function () {
            //当前页面变了
            pageIndex = nextIndex;
            //动画完了
            nextPage.style.transition = "";
            setStatic();
        }, 500);
    }

    //事件
    var pageContainer = $(".page_container");
    pageContainer.ontouchstart = function (e) {
        //类似于mousedown，表示手指按下
        var y = e.touches[0].clientY;

        function handle(e) {
            var dis = e.touches[0].clientY - y;
            if (Math.abs(dis) < 10) { //防止误触
                dis = 0; //相当于手指没动
            }
            moving(dis);
            //阻止事件的默认行为
            if (e.cancelable) {
                //如果事件可以取消
                e.preventDefault(); //取消事件 - 阻止默认行为
            }
        }
        //手指按下，监听移动
        pageContainer.addEventListener("touchmove", handle, {passive: false,});



        //手指松开，完成移动
        pageContainer.ontouchend = function () {
            finishMove();
            pageContainer.removeEventListener("touchmove", handle); //手指松开了，不用监听移动了
        }
    }



    // 自动切换到某个板块
    // index 页面索引

    function showPage(index) {
        var nextPage = pages[index]; //下一个页面元素
        if (index < pageIndex) {
            //下一个页面在当前页面上面
            nextPage.style.top = -height() + "px";
        } else if (index > pageIndex) {
            //下一个页面在当前页面下面
            nextPage.style.top = height() + "px";
        } else {
            //下一个页面就是当前页面
            if (pageIndex === 0) {
                //目前是第一个页面
                pageIndex++;
            } else {
                pageIndex--;
            }
            setStatic(); //重新设置位置
        }
        //强行让浏览器渲染
        nextPage.clientHeight; //读取dom的尺寸和位置，会导致浏览器强行渲染
        nextIndex = index; //获取下个页面的索引
        finishMove();
    }

    return showPage;
})();