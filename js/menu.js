(function () {
    var divSwitch = $(".menu_switch");
    var ulNav = $(".menu_nav");

    //切换菜单的显示状态
    function toggleNav() {
        divSwitch.classList.toggle("menu_switch--expand");
        ulNav.classList.toggle("menu_nav--expand");
    
    }
    divSwitch.onclick = toggleNav;
    $(".menu_nav").onclick = toggleNav; //选择这一部分 也让其设置页面开关
}())