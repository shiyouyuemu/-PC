define([
    'autoLogin',
    'cookie',
    'render',
    "template",
    "shoppingCart",
    "list",
    "sendSelf",
    "lazyLoad"
], function (autoLogin, render, shoppingCart, lazyLoad) {
    'use strict';
    $(".header_left").autoLogin({

    });
    $("body").shoppingCart({
        cartNum: ".cartNum"
    });
    $("body").list({
        cont: ".waterfall_cont",
        templates: "#temp",
        typeList: ".navList_cont",
        start: 0
    });
    setTimeout(function () {
        $("body").sendSelf({
            item: ".item"
        });
    }, 1000);
    $("body").lazyLoad({
        li: ".item",
        cont: ".waterfall_cont",
        templates: "#temp",
        typeList: ".navList_cont",
        ifloading:true
    });
});