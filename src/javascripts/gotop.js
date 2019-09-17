
;(function(factory){
    if(typeof define ==="function"&&define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.gotop=function(option){
        new GoBack().init(this,option);
    }
    function GoBack(){}
    $.extend(GoBack.prototype,{
        init:function(btn,option){
            this.boundary=$(option.boundary);
            this.btn=btn;
            this.dom=$(window);
            this.bindEvent();
        },
        bindEvent:function(){
            this.dom.scroll(this.follow.bind(this));
            this.btn.on("click",this.goTop.bind(this));
        },
        goTop:function(){
            this.btn.css({
                display:"none"
            });
            this.dom.scrollTop(0);
        },
        follow:function(){
            if(this.dom.scrollTop()>this.boundary.offset().top){
                this.btn.css({
                    display:"block"
                })
            }else{
                this.btn.css({
                    display:"none"
                })
            }
        },
        
    });
})




























