define([
    'formcheck',
    'register'
], function(formcheck, register) {
    'use strict';
    $(".register_list").formcheck({
        account:"#register_acc",
        password:"#register_pwd",
        repassword:"#register_rpwd",
        verification:"#register_ver",
        randomVerification:"#register_rom",
        cont:".login_register",
        agree:"#agree"
    });
    $(".login_register").register({
        account:"#register_acc",
        password:"#register_pwd",
        cont:".register_list"
    });
});








