define([
    'autoLogin',
    'render',
    "load",
    "addCart",
    "shoppingCart",
    "magnifier",
    "sendSelf",
    "banner",
    "changeTab",
    "lazyLoad",
    "outLogin"
], function(autoLogin, sendSelf,render,load,addCart,magnifier,banner,changeTab,lazyLoad) {
    'use strict';
    $(".header_left").autoLogin();
    // $("body").load({
    //     cont:"#detailCont",
    //     template:"#contents",
    //     cont2:"#cont2",
    //     template2:"#detailsCont2"
    // });
    $("body").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "10",
        start: 0,
        templates: "#baokuan_temp",
        cont: "#baokuan_banner"
    });
    $("body").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "10",
        start: 0,
        templates: "#jingpin_temp",
        cont: "#jingpin_banner"
    });
    $("body").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "10",
        start: 0,
        templates: "#chaozhi_temp",
        cont: "#chaozhi_banner"
    });
    $("body").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "15",
        start: 0,
        templates: "#noTabTemp",
        cont: "#noTab"
    });
    $("body").changeTab({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "3",
        start: 0,
        templates: "#baokuanTemp",
        cont: "#baokuanCont",
        tab:".baokuan_tab",
        item:".tab_btn"
    });
    $("body").changeTab({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "3",
        start: 0,
        templates: "#manjianTemp",
        cont: "#manjianCont",
        tab:".manjian_tab",
        item:".tab_btn",
        ifSpecial:true
    });
    $("body").changeTab({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "3",
        start: 0,
        templates: "#chaozhiTemp",
        cont: "#chaozhiCont",
        tab:".chaozhi_tab",
        item:".tab_btn"
    });
    $("body").changeTab({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "3",
        start: 0,
        templates: "#dazheTemp",
        cont: "#dazheCont",
        tab:".dazhe_tab",
        item:".tab_btn",
        ifSpecial:true
    });
    $("body").changeTab({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "100",
        chid: "17",
        start: 0,
        templates: "#guessTemp",
        cont: "#guessCont",
        tab:".guess_tab",
        item:".tab_btn",
        ifSpecial:true
    });
    $("body").lazyLoad({
        li: ".item",
        cont: "body",
        ifloading:false
    });
    setTimeout(function () {
        $("body").sendSelf({
            item: ".item"
        });
        $(".baokuan_banner").banner({
            btns:{
                prev_btn:".prev",
                next_btn:".next"
            },
            auto:true,
            type:"change",
            slides:".slide",
            cont:".baokuan_banner",
            num:8,
            changeNum:4
        });
        $(".jingpin_banner").banner({
            btns:{
                prev_btn:".prev",
                next_btn:".next"
            },
            auto:true,
            type:"change",
            slides:".slide",
            cont:".jingpin_banner",
            num:8,
            changeNum:4
        });
        $(".chaozhi_banner").banner({
            btns:{
                prev_btn:".prev",
                next_btn:".next"
            },
            auto:true,
            type:"change",
            slides:".slide",
            cont:".chaozhi_banner",
            num:8,
            changeNum:4
        });
    }, 1000);
    $("body").shoppingCart({
        cartNum:".cartNum"
    });
});