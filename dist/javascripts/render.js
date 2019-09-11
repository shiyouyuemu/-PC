(function(factory){
    if(typeof define =="function"&&define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.render=function(options){
        new Render().init(this,options);
    }
    function Render(){}
    $.extend(Render.prototype,{
        init:function(that,options){

        },
        bindEvent:function(){

        },
        getData:function(){

        }
    })
})
//http://www.cycang.com/index.php?c=page&a=page&nums=8&chid=16&start=0