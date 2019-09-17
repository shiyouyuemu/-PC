(function (factory) {
    if (typeof define == "function" && define.amd) {
        define(["jquery","template"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.render = function (options) {
        new Render().init(this, options);
    }

    function Render() {}
    $.extend(Render.prototype, {
        init: function (that, options) {
            this.that = that;
            options.url ? this.url = options.url : "";
            options.c ? this.c = options.c : "";
            options.a ? this.a = options.a : "";
            options.nums ? this.nums = options.nums : "";
            options.chid ? this.chid = options.chid : "";
            options.start ? this.start = options.start : "";
            options.cont ? this.cont = options.cont : "";
            options.templates?this.templates=options.templates:"";
            options.ifAdd!=undefined?this.ifAdd=options.ifAdd:this.ifAdd=true;
            options.url ? this.getData() : "";
        },
        getData: function () {
            var cont=this.cont;
            var templates=this.templates;
            var ifAdd=this.ifAdd;
            $.ajax({
                url: this.url,
                type: "get",
                dataType: "json",
                data: {
                    c: this.c,
                    a: this.a,
                    nums: this.nums,
                    chid: this.chid,
                    start: this.start
                },
                success: function (res) {
                    if (res.code == "200") {
                        var html = template($(templates).html(), res.result.data);
                        ifAdd?$(cont).html($(cont).html()+html):$(cont).html(html);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            })
        }
    })
})
//http://www.cycang.com/index.php?c=page&a=page&nums=8&chid=16&start=0