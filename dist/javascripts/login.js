(function (factory) {
    if (typeof define == "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.login = function (options) {
        new Login().init(this, options);
    }

    function Login() {}
    $.extend(Login.prototype, {
        init: function (that, options) {
            this.that = that;
            this.options = options;
            this.options.account ? this.acc = this.options.account : "";
            this.options.password ? this.pwd = this.options.password : "";
            this.options.cont ? this.cont = this.options.cont : "";
            this.bindEvent();
        },
        bindEvent: function () {
            this.that.on("click", this.log.bind(this));
        },
        log: function () {
            let ifOk = $(this.cont).attr("ifOk");
            if (ifOk==="true") {
                let src = "/lophp"+"/ciyuancang/server/login.php";
                $.ajax({
                    url:src,
                    type: "get",
                    dataType: "json",
                    data: {
                        username: $(this.acc).val(),
                        password: $(this.pwd).val()
                    },
                    success: function (res) {
                        //res = JSON.parse(res);
                        switch (res.code) {
                            case 1:
                                location.href = "../index.html";
                                break;
                            case 2:
                                alert("参数不全");
                                break;
                            case 3:
                                alert("数据库查询错误");
                                break;
                            case 4:
                                alert("用户名和密码不符");
                                break;
                        }
                    },error:function(e){
                        console.log("登录失败，请检查您的网络！"+e);
                    }

                })
            } else {
                return false;
            }
        }
    });
})