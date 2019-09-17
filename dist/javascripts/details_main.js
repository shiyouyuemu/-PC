define([
    'autoLogin',
    'render',
    "load",
    "addCart",
    "shoppingCart",
    "magnifier",
    "sendSelf",
    "banner"
], function(autoLogin, sendSelf,render,load,addCart,magnifier,banner) {
    'use strict';
    $(".header_left").autoLogin();
    $("body").load({
        cont:"#detailCont",
        template:"#contents",
        cont2:"#cont2",
        template2:"#detailsCont2"
    });
    $("body").addCart({
        num:"#num_num",
        btn:".num_btn",
        add:".addcart"
    });
    setTimeout(function(){
        $("body").magnifier({
            img:"#small_img"
        });
    },100);
    $("#banner").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "17",
        start: parseInt(Math.random() * 100),
        templates: "#buyMore",
        cont: "#banner"
    });
    setTimeout(function () {
        $("body").sendSelf({
            item: ".item"
        });
        $(".banner_Cont").banner({
            btns:{
                prev_btn:".prev",
                next_btn:".next"
            },
            auto:true,
            type:"change",
            slides:".slide",
            cont:".banner_Cont"
        });
    }, 1000);
});