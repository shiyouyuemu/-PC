define([
    "formcheck",
    "login"
], function(formcheck,login) {
    'use strict';
    $(".login_box").formcheck({
        account:"#login_acc",
        password:"#login_pwd",
        verification:"#login_ver",
        randomVerification:"#login_random"
    });
    $("#login").login({
        account:"#login_acc",
        password:"#login_pwd",
        cont:".login_box"
    });
});




