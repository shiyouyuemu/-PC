(function(factory){
    if(typeof define =="function"&&define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.shoppingCart=function(options){
        new ShoppingCart().init(this,options);
    }
    function ShoppingCart(){}
    $.extend(ShoppingCart.prototype,{
        init:function(that,options){
            options?this.options=options:"";
            options.cartNum?this.num=options.cartNum:"";
            this.setNum();
        },
        setNum:function(){
            var obj=(localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):{data:[],cont:0});
            if(this.num!=".cartnum"){
                if(obj.cont==0){
                    $(this.num).css({
                        display:"none"
                    })
                }else{
                    $(this.num).css({
                        display:"block"
                    })
                    $(this.num).text(obj.cont);
                }   
            }else{
                $(this.num).text(obj.cont);
            }
            
        }
    })
})