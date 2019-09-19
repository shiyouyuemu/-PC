(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery","cookie"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.autoLogin = function (options) {
        new AutoLogin().init(this, options);
    }

    function AutoLogin() {}
    $.extend(AutoLogin.prototype, {
        init: function (that, options) {
            this.that = that;
            this.options = options;
            this.autolog();
            var str=window.location.search;
            if(str==""){
                localStorage.removeItem(window.name)
            }else{
                var tname=str.split("=")[0].split("?")[1];
                if(tname=="typename"){
                    localStorage.removeItem(window.name)
                }
            }
        },
        autolog: function () { 
            var login_cookie=null;
            if($.cookie("usrmsg")){
                login_cookie = $.cookie("usrmsg");
                var that = $(this.that);
            login_cookie = decodeURIComponent(login_cookie);
            try {
                login_cookie = JSON.parse(login_cookie);
                if (login_cookie) {
                    var src = "/lophp" + "/ciyuancang/server/login.php"; 
                    $.ajax({
                        url: src,
                        dataType: "json",
                        type: "get",
                        data: {
                            username: login_cookie.username,
                            password: login_cookie.password,
                            type: "cookie"
                        },
                        success: function (res) {
                            //res = JSON.parse(res);
                            if (res.code == 1) {
                                that.html(`<a>${login_cookie.username}</a><a id="out">退出登录</a>`);
                                    $("#out").outLogin({
                                        cont: "#username"
                                    });
                            }
                        }
                    });
                }
            }
            
             catch (e) {
                console.log(e);
            }
        }
        }
    });
});