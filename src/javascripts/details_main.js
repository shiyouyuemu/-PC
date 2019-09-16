define([
    'autoLogin',
    'render',
    "load",
    "addCart",
    "shoppingCart"
], function(autoLogin, render,load,addCart) {
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
    
});