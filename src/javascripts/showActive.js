(function (factory) {
    if (typeof define == "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.showActive = function (options) {
        new ShowActive().init(options);
    }

    function ShowActive() {}
    $.extend(ShowActive.prototype,{
        init:function(options){
            options?this.options=options:"";
            this.options.cont?this.cont=this.options.cont:"";
            this.options.btn?this.btn=this.options.btn:"";
            this.bindEvent();
        },
        bindEvent:function(){
            $(this.btn).on("click",function(){
                $(this.cont).hide();
            }.bind(this));
        }
    });

})