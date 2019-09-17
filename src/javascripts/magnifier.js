(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
       $.fn.magnifier=function(options){
           new Magnifier().init(options);
       }
       function Magnifier(){}
       $.extend(Magnifier.prototype,{
           init:function(options){
                options.img?this.img=options.img:"";
                this.bindEvent();
           },
           bindEvent:function(){
                $(this.img).parent().on("mouseenter",function(){
                    $(this).children().css({
                        width:"200%",
                        height:"200%",
                        cursor:"zoom-in"
                    });
                });
               $(this.img).parent().on("mouseleave",function(){
                $(this).children().css({
                    width:"100%",
                    height:"330px",
                    left:0,
                    top:0
                });
               });
               var _=this;
               $(this.img).parent().on("mousemove",function(e){
                   _.enlarge.bind(this)(e);
               });
           },
           enlarge:function(e){
            var evt=e||event;
            var position={
                x:-evt.offsetX/2,
                y:-evt.offsetY/2
            }
            $(this).children().css({
                left:position.x+"px",
                top:position.y+"px"
            })
            
                
           }
       })
});