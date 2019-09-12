define([
    'autoLogin',
    'render',
    "load"
], function(autoLogin, render,load) {
    'use strict';
    $(".header_left").autoLogin();
    $("body").load({
        cont:"#detailCont",
        template:"#contents",
        cont2:"#cont2",
        template2:"#detailsCont2"
    });
});