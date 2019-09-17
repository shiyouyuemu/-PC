(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.lazyLoad = function (options) {
        new LazyLoad().init(options);
    }

    function LazyLoad() {}
    $.extend(LazyLoad.prototype, {
        init: function (options) {
            options ? this.options = options : "";
            options.ifloading!=undefined?this.ifloading=options.ifloading:this.ifloading=false;
            options.cont ?this.cont=options.cont:"";
            options.templates?this.templates=options.templates:"";
            options.typeList?this.typeList=options.typeList:"";
            options.li?this.li = options.li:"";
            options.ifAdd?this.ifAdd=options.ifAdd:this.ifAdd=true;
            this.isDown = false;
            this.showArray = [];
            this.nameList = [];
            this.start = 0;
            this.liststart = 0;
            this.ifgo = true;
            this.bindEvent();
            setTimeout(this.lazyLoad.bind(this), 200);

        },
        bindEvent: function () {
            var _ = this;
            $(window).on("scroll", function () {
                _.lazyLoad();
            });
        },
        lazyLoad: function () {
            this.list = $(this.li);
            this.nowScroll = $(document).scrollTop();
            this.wheight = $(window).height();
            for (var i = this.liststart; i < this.list.length; i++) {

                if ($(this.list[i]).offset().top <= this.nowScroll + this.wheight) {
                    if ($.inArray($(this.list[i]).attr("data-name"), this.nameList) == -1) {
                        this.showArray.push(this.list[i]);
                        this.nameList.push($(this.list[i]).attr("data-name"));
                        this.liststart++;
                    }
                }
            }
            if (this.showArray.length > 0 && this.showArray.length <= this.list.length) {
                this.ifLoad();
            }
        },
        ifLoad: function () {
            if (!this.isDown) {
                this.showArray.forEach(item => {
                    var img = new Image();
                    img.src = $(item).attr("data-img");
                    img.onload = function () {
                        
                        $(item).find("img").attr("src", img.src);
                        
                    }
                });
                if(this.ifloading){
                    this.rend();
                }else{
                    if (this.showArray.length == this.list.length){
                        this.isDown=true;
                    }
                }
            }
        },
        rend:function(){
            if (this.showArray.length == this.list.length && this.list.last().offset().top+this.list.last().height() <= this.nowScroll + this.wheight) {
                this.isDown = true;
                this.start += 16;
                $("body").list({
                    cont: this.cont,
                    templates: this.templates,
                    typeList: this.typeList,
                    start: this.start,
                    ifAdd:this.ifAdd
                });
                setTimeout(this.rending.bind(this), 500);
            }
        },
        rending: function () {
            this.isDown = false;
            this.list = $(this.li);
        }
    });
});