define([
    "autoLogin",
    "render",
    "sendSelf",
    "outLogin",
    "shoppingCart",
    "lazyLoading",
    "list",
    "anotherChange",
    "tab",
    "banner",
    "gotop",
    "showActive"
], function (autoLogin, render, sendSelf,lazyLoading,gotop,showActive) {

    $("#username").autoLogin();
    $(".banner_center").banner({
        auto:true,
        slides:".slide",
        dot:true
    });
    $(".go_top").gotop({
        boundary:"#content"
    });
    $("body").showActive({
        btn:".delete",
        cont:".activity"
    });
    $("body").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "20",
        chid: "0",
        start: "0",
        templates: "#box_one",
        cont: "#boxOne",
        li: ".item"
    });
    $("body").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "20",
        chid: "5",
        start: "0",
        templates: "#box_two",
        cont: "#boxTwo",
        li: ".item"
    });
    $("#box_zhuangban").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "5",
        start: "0",
        templates: "#box_zhuangban",
        cont: "#boxZhuangban",
        li:".item"
    });
    $("#box_gufeng").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "6",
        start: "0",
        templates: "#box_gufeng",
        cont: "#boxGufeng",
        li:".item"
    });
    $("#box_hanfeng").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "15",
        start: "0",
        templates: "#box_hanfeng",
        cont: "#boxHanfeng",
        li:".item"
    });
    $("#box_shoushi").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "12",
        start: "0",
        templates: "#box_shoushi",
        cont: "#boxShoushi",
        li:".item"
    });
    $("#box_lingshi").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "10",
        start: "0",
        templates: "#box_lingshi",
        cont: "#boxLingshi",
        li:".item"
    });
    $("#box_fushi").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "8",
        start: "0",
        templates: "#box_fushi",
        cont: "#boxFushi",
        li:".item"
    });
    $("#box_zhoubian").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "16",
        start: "0",
        templates: "#box_zhoubian",
        cont: "#boxZhoubian",
        li:".item"
    });
    $("#box_shouban").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "13",
        start: "0",
        templates: "#box_shouban",
        cont: "#boxShouban",
        li:".item"
    });
    $("#box_guess").lazyLoading({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "17",
        start: parseInt(Math.random() * 100),
        templates: "#box_guess",
        cont: "#boxGuess",
        li:".item"
    });
    $(".friend_cont").lazyLoad({
        li:".friend_cont .item",
        ifloading:false
    })
    setTimeout(function () {
        $("body").sendSelf({
            item: ".item"
        });
    }, 1000);
    $("body").shoppingCart({
        cartNum:".cartnum"
    });
    $("body").anotherChange({
        item:".title_center"
    });
    $(".recommend_cont").tab({
        bar:".recommend_bar",
        item:".boxList",
        btn:".rbtn"
    })
});