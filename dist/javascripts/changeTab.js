(function (factory) {
    if (typeof define == "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.changeTab = function (options) {
        new ChangeTab().init(options);
    }

    function ChangeTab() {}
    $.extend(ChangeTab.prototype, {
        init: function (options) {
            options ? this.options = options : "";
            options.item ? this.item = options.item : "";
            options.url ? this.url = options.url : "";
            options.c ? this.c = options.c : "";
            options.a ? this.a = options.a : "";
            options.nums ? this.nums = options.nums : "";
            options.chid ? this.chid = options.chid : "";
            options.start ? this.start = options.start : "";
            options.cont ? this.cont = options.cont : "";
            options.tab ? this.tab = options.tab : "";
            options.templates ? this.templates = options.templates : "";
            options.ifSpecial!=undefined?this.ifSpecial=options.ifSpecial:this.ifSpecial=false;
            this.startNum=this.nums;
            this,timer=null;
            this.start(this);
            this.bindEvent();
        },
        bindEvent: function () {
            var _ = this;
            $(this.tab).find(this.item).on("mouseover", function () {
                clearTimeout(_.timer);
               _.timer=setTimeout(function () {
                    _.ifSpecial?$(_.tab).find(_.item).removeClass("active"):"";
                    $(_.tab).find("span").removeClass("active");
                    _.change.bind(this)(_);
                }.bind(this), 1000)
            });
            $(this.tab).on("mouseleave",function(){
                clearTimeout(_.timer);
            });
        },
        change: function (_) {
            var key = $(this).attr("child_type");
            $(this).attr("num")?_.nums=parseInt($(this).attr("num")):_.nums=_.startNum;
            $(this).find("span").addClass("active");
            _.ifSpecial?$(this).addClass("active"):"";
            var chid = _.chid;
            switch (key) {
                case "01":
                    _.chid = 3;
                    break;
                case "02":
                    _.chid = 5;
                    break;
                case "03":
                    _.chid = 6;
                    break;
                case "04":
                    _.chid = 8;
                    break;
                case "05":
                    _.chid = 12;
                    break;
                case "06":
                    _.chid = 10;
                    break;
                case "07":
                    _.chid = 8;
                    break;
                case "08":
                    _.chid = 16;
                    break;
                case "09":
                    _.chid = 13;
                    break;
                case "09":
                    _.chid = 17;
                    break;
            }
            if (chid != _.chid) {
                $("body").render({
                    url: _.url,
                    c: _.c,
                    a: _.a,
                    nums: _.nums,
                    chid: _.chid,
                    start: _.start,
                    templates: _.templates,
                    cont: _.cont,
                    ifAdd: false
                });
                setTimeout(function () {
                    $("body").sendSelf({
                        item: ".item"
                    });
                    $("body").lazyLoad({
                        li: ".item",
                        cont: "body",
                        ifloading:false
                    });
                }, 500);
            }
        },
        start: function () {
            $($(this.tab).find(this.item)[0]).attr("num")?this.nums=parseInt($($(this.tab).find(this.item)[0]).attr("num")):"";
            $("body").render({
                url: this.url,
                c: this.c,
                a: this.a,
                nums: this.nums,
                chid: this.chid,
                start: this.start,
                templates: this.templates,
                cont: this.cont,
                ifAdd: false
            });
        }
    })

})