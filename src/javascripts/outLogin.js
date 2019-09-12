(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery","cookie"], factory);
    } else {
        factory(jQuery);
    }
})(function($){
    $.fn.outLogin=function(options){
        new OutLogin().init(this,options);
    }
    function OutLogin(){}
    $.extend(OutLogin.prototype,{
        init:function(that,options){
            this.that=that;
            options.cont?this.cont=options.cont:"";
            this.bindEvent();
        },
        bindEvent:function(){
            $(this.that).on("click",this.outLogin.bind(this));
        },
        outLogin:function(){
            console.log(1)
            $.removeCookie('usrmsg',{path:'/'})
            $(this.cont).html(`<a href="./login.html">请登录</a>
            <a href="./register.html">免费注册</a>`);
        }
    })
})