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
            this.li = options.li;
            this.isDown = false;
            this.showArray = [];
            this.start = 0;
            this.ifgo=true;
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
            for (var i = this.start; i < this.list.length; i++) {

                if ($(this.list[i]).offset().top <= this.nowScroll + this.wheight) {
                    this.showArray.push(this.list[i]);
                    this.start++;
                }
            }
            if (this.showArray.length > 0) {
                this.ifLoad();
            }
        },
        ifLoad:function () {
            if (!this.isDown) {
                this.showArray.forEach(item => {

                    var img = new Image();
                    img.src = $(item).attr("data-img");
                    img.onload = function () {
                        $(item).find("img").attr("src", img.src);
                    }
                });
            }
            console.log(this.showArray.length,this.list.length,parseInt(this.list.length/16))
            if (this.showArray.length == this.list.length) {
                
                this.isDown = true;
                if (this.isDown && $(this.list).last().offset().top + $(this.list).last().height() <= this.nowScroll + this.wheight) {
                    if(this.ifgo){
                        this.ifgo=false;
                        setTimeout(function(){
                            this.start = (parseInt(this.list.length/16))*16;
                            this.list = $(this.li);
                            this.ifgo=true;
                        }.bind(this),1000);
                        $("body").list({
                            cont: ".waterfall_cont",
                            templates: "#temp",
                            typeList: ".navList_cont",
                            start: this.start
                        });
                    }
                    
                }
            }else{
                this.isDown=false;
            }
        }
    });
});