(function(factory){
    if(typeof define ==="function"&&define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.sendSelf=function(options){
        new SelfSend().init(this,options);
    }
    function SelfSend(){}
    $.extend(SelfSend.prototype,{
        init:function(that,options){
            options.item?this.item=options.item:"";
            this.bindEvent();
        },
        bindEvent:function(){
            $(this.item).on("click",this.send);
        },
        send:function(){
            var that=$(this);
            var data={
                name:that.attr("data-name"),
                price:that.attr("data-price"),
                img:that.attr("data-img")
            }
           localStorage.setItem("details",JSON.stringify(data));
        }
    });
})