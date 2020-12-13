var showPop = (function () { //想污染全局变量就返回，
    /* 
     *   弹出窗口
     *   @parm{*} id
     */

    function showPop(id) {
        var container = $("#" + id);
        $("#" + id).style.display = "";
        if(id === "popVideo"){
            var vdo = container.querySelector("video");
            vdo.play();
        }
    }

    //获取所有的关闭按钮
    var closes = $$(".pop_close");
    for (var i = 0; i < closes.length; i++) {
        closes[i].onclick = function () {
            var container = this.parentElement.parentElement;
            container.style.display = "none"; //点的哪个是关闭，就让他的父元素的父级的id隐藏掉
        };
    }


    //处理微信和qq的选中状态
    (function () {
        var popwx = $("#popAttend .pop_wx");
        var popqq = $("#popAttend .pop_qq");
        popwx.onclick = function () {
            popwx.classList.add("selected");
            popqq.classList.remove("selected");
        };
        popqq.onclick = function () {
            popwx.classList.remove("selected");
            popqq.classList.add("selected");
        };
    })();

    //处理关闭视频弹窗时候，视频暂停
    var closeBtn = $("#popVideo .pop_close");
    closeBtn.addEventListener("click",function(){
        $("#popVideo video").pause();
    })


    return showPop;
})();