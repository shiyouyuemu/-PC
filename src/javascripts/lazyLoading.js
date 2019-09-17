(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery","lazyLoad"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.lazyLoading = function (options) {
        new LazyLoading().init(options);
    }

    function LazyLoading() {}
    $.extend(LazyLoading.prototype,{
        init:function(options){
            options.url ? this.url = options.url : "";
            options.c ? this.c = options.c : "";
            options.a ? this.a = options.a : "";
            options.nums ? this.nums = options.nums : "";
            options.chid ? this.chid = options.chid : "";
            options.start ? this.start = options.start : "";
            options.cont ? this.cont = options.cont : "";
            options.templates?this.templates=options.templates:"";
            options.li ? this.li = options.li : "";
            options.typeList ? this.typeList = options.typeList : "";
            $("#box_one").render({
                url: this.url,
                c: this.c,
                a: this.a,
                nums: this.nums,
                chid: this.chid,
                start: this.start,
                templates: this.templates,
                cont: this.cont,
                ifAdd:false
            });
            $("body").lazyLoad({
                li: this.cont+" "+this.li,
                cont: this.cont,
                templates: this.templates,
                typeList: this.typeList,
                chid:this.chid,
                ifloading:false
            });
            $("body").anotherChange({
                item:".title_center",
                url: this.url,
                c: this.c,
                a: this.a,
                nums: this.nums,
                chid: this.chid,
                start: this.start,
                templates: this.templates,
                cont: this.cont,
                li:this.li
            });
        }
    })    
});