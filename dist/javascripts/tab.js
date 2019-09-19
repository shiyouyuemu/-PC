(function(factory){
    if(typeof define=="function"&& define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.tab=function(options){
        new Tab().init(this,options);
    }
    function Tab(){}
    $.extend(Tab.prototype,{
        init:function(that,options){
            this.that=that;
            options.bar?this.bar=options.bar:"";
            options.btn?this.btn=options.btn:"";
            options.item?this.item=options.item:"";
            this.bindEvent();
        },
        bindEvent:function(){
            var _=this;
            $(this.btn).on("click",function(){
                _.changeTab.bind(this)(_);
            })
        },
        changeTab:function(_){
            $(_.btn).removeClass("active");
            $(_.item,_.that).css({
                display:"none"
            });
            var position=$(this).attr("position");
            if(position=="left"){
                $(_.bar).animate({
                    left:"0"
                },1000);
                $(_.item,_.that).first().css({
                    display:"block"
                });
            }else{
                $(_.bar).animate({
                    left:"50%"
                },1000);
                $(_.item,_.that).last().css({
                    display:"block"
                });
            }
            $(this).addClass("active");
        }
    });
    

})