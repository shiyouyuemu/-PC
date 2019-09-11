(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
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
        },
        autolog: function () {
            
            
            var login_cookie = $.cookie("usrmsg");
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
                            }
                        }
                    })
                }
            } catch (e) {
                alert("cookie出现错误！");
            }
        }
    });
    // var logined_cookie = cookie("usrmsg");
    //   var nav = $(".nav");
    //   // console.log(logined_cookie);
    //   logined_cookie=decodeURIComponent(logined_cookie);
    //   try {
    //     logined_cookie = JSON.parse(logined_cookie);

    //     if (logined_cookie) {
    //       // 发送内部的username和password让login进行验证;
    //       var url = "http://localhost/06login/server/login.php?" + "username=" + logined_cookie.username +
    //         "&password=" + logined_cookie.password + "&type=cookie";
    //       $.ajax(url, function (res) {
    //         console.log(res);
    // res = JSON.parse(res);
    // if (res.code == 1) {
    //   nav.innerHTML = `<li><a>${logined_cookie.username}</a></li><li><a id="out">退出登录</a></li>`;
    // }
    //       });
    //     }
    //   } catch (e) {
    //       console.log(e)
    //   }
})