;(function(factory){
    if(typeof define ==="function"&&define.amd){
          define(["jquery"],factory);
    }else{
          factory(jQuery);
    }
})(function($){
    $.fn.banner=function(options){
          new Banner().init(this,options);
    }
    function Banner(){}
    $.extend(Banner.prototype,{
          init:function(content,options){
                this.content=content;
                this.prevBtn=$(options.btns.prev_btn,this.content);
                this.nextBtn=$(options.btns.next_btn,this.content);
                this.slides=$(options.slides,this.content);
                this.index=0;
                this.previndex=0;
                this.playTimer=null;
                this.bindEvent();
                this.autoPlay();
          },
          bindEvent:function(){
                this.prevBtn.on("click",this.changeIndex.bind(this,"prev"));
                this.nextBtn.on("click",this.changeIndex.bind(this,"next"));
          },
          changeIndex:function(str){
                if(str==="next"){
                      this.previndex=this.index;
                      if(this.index===this.slides.length-1){
                            
                            this.index=0;
                      }else{
                            this.index++;
                      }
                }else if(str==="prev"){
                      this.previndex=this.index;
                      if(this.index===0){
                            this.index=this.slides.length-1;
                      }else{
                            this.index--;
                      }
                }
                this.animate();
          },
          animate:function(){
                this.slides.removeClass("show").eq(this.index).addClass("show").css({
                      display:"none"
                }).stop().fadeIn(2000);
                this.slides.removeClass("prev-show").eq(this.previndex).addClass("prev-show");
          },
          autoPlay:function(){
                clearInterval(this.playTimer);
                this.playTimer=setInterval(function(){
                      this.changeIndex("next");
                }.bind(this),3000);
          }
    });
})