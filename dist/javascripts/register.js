(function (factory) {
    if (typeof define == "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.register = function (options) {
        new Register().init(this, options);
    }

    function Register() {}
    $.extend(Register.prototype, {
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
            let ifCom=$(this.cont).attr("ifCom");
            if (ifOk=="true"&&ifCom=="false") {
                let src = "/lophp/ciyuancang/server/register.php";
                $.ajax({
                    url:src,
                    type: "get",
                    dataType: "json",
                    data: {
                        username: $(this.acc).val(),
                        password: $(this.pwd).val()
                    },
                    success: function (res) {                 
                        switch (res.code) {
                          case 1:
                            location.href = "./login.html";
                            break;
                          case 2:
                            alert("账号或密码缺失不全");
                            break;
                          case 3:
                            alert("数据库查询错误");
                            break;
                          case 4:
                            alert("密码或用户名错误");
                            break;
                          case 5:
                            alert("用户名已经存在");
                            break;
                          case 6:
                            alert("注册失败");
                            break;
                        }
                    },error:function(){
                        alert("登录失败，请检查您的网络！");
                    }

                })
            } else {
                return false;
            }
        }
    });
})