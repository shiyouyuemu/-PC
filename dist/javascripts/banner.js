;
(function (factory) {
      if (typeof define === "function" && define.amd) {
            define(["jquery"], factory);
      } else {
            factory(jQuery);
      }
})(function ($) {
      $.fn.banner = function (options) {
            new Banner().init(this, options);
      }

      function Banner() {}
      $.extend(Banner.prototype, {
            init: function (content, options) {
                  options ? this.options = options : "";
                  options.cont?this.cont = $(options.cont):this.cont=content;
                  options.btns ? this.prevBtn = $(options.btns.prev_btn, this.content) : "";
                  options.btns ? this.nextBtn = $(options.btns.next_btn, this.content) : "";
                  options.auto ? this.auto = true : this.auto = false;
                  options.dot ? this.dot = true : this.dot = false;
                  options.type ? this.type = options.type : this.type = "hide";
                  options.wrapper ? this.wrapper = options.wrapper : this.wrapper = ".wrapper";
                  options.changeNum?this.changeNum=parseInt(options.changeNum):this.changeNum=1;
                  options.num?this.num=parseInt(options.num):this.num=0;
                  this.slides = this.cont.find(options.slides);
                  this.type=="change"?this.createLF():"";
                  this.slides = this.cont.find(options.slides);
                  this.distance=$(this.slides[1]).width()+parseInt($(this.slides[1]).css("marginRight"))+parseInt($(this.slides[1]).css("borderLeft"))+parseInt($(this.slides[1]).css("borderRight"));
                  this.index = this.num;
                  this.previndex = 0;
                  this.playTimer = null;
                  this.timer=null;
                  this.ifTime=true;
                  this.auto ? this.autoPlay() : "";
                  this.dot ? this.createDot() : "";
                  this.type=="change"?$(this.wrapper,this.cont).css({
                        left:-this.num*this.distance+"px"
                  }):"";
                  this.bindEvent();
            },
            bindEvent: function () {
                  var _ = this;
                  this.options.btns ? this.prevBtn.on("click",function(){
                        _.changeIndex( "prev");
                        _.auto ? _.autoPlay() : "";
                  }): "";
                  this.options.btns ? this.nextBtn.on("click",function(){
                        _.changeIndex( "next");
                        _.auto ? _.autoPlay() : "";
                  }): "";
                  this.options.dot ? $(".dot").on("click", function (e) {
                        _.changeIndex("dot", e);
                        _.auto ? _.autoPlay() : "";
                  }) : "";
            },
            changeIndex: function (str, evt) {
                  if(this.ifTime){
                        if (str === "next") {
                              this.previndex = this.index;
                              if (this.index === this.slides.length - 1) {
      
                                    this.index = 0;
                              } else {
                                    this.index+=this.changeNum;
                              }
                        } else if (str === "prev") {
                              this.previndex = this.index;
                              if (this.index === 0) {
                                    this.index = this.slides.length - 1;
                              } else {
                                    this.index-=this.changeNum;
                              }
                        } else if (str == "dot") {
                              var e = evt || event;
                              var target = e.target;
                              $.each($(".dot"), (index, item) => {
                                    if (item == target) {
                                          this.previndex = this.index;
                                          this.index = index;
                                    }
                              });
                        }
                        this.play();
                        this.ifTime=false;
                        clearTimeout(this.timer);
                        this.timer=setTimeout(function(){
                              this.ifTime=true;
                        }.bind(this),1000);
                  }
            },
            play: function () {
                  switch (this.type) {
                        case "hide":
                              this.slides.removeClass("show").eq(this.index).addClass("show").css({
                                    display: "none"
                              }).stop().fadeIn(2000);
                              this.slides.removeClass("prev-show").eq(this.previndex).addClass("prev-show");
                              $(".dot").removeClass("active").eq(this.index).addClass("active");
                              break;
                        case "change":
                              if(this.index==this.changeNum){
                                    $(this.wrapper,this.cont).css({
                                          left:(-this.num-this.changeNum-this.changeNum)*this.distance+"px"
                                    });
                                    this.index=this.num+this.changeNum;
                              }else if(this.index==this.slides.length -this.num+this.changeNum){
                                    $(this.wrapper,this.cont).css({
                                          left:-this.num*this.distance+"px"
                                    });
                                    this.index=this.num+this.changeNum;
                              }
                                    $(this.wrapper,this.cont).animate({
                                          left:-this.index*this.distance+"px"
                                  },500);
                              

                  }
            },
            autoPlay: function () {
                  clearInterval(this.playTimer);
                  this.playTimer = setInterval(function () {
                        this.changeIndex("next");
                  }.bind(this), 3000);
            },
            createDot: function () {
                  var length = $(this.slides).length;
                  var cont = document.createElement("div");
                  $(cont).attr("class", "dotCont");
                  $(cont).css({
                        width: 24 * length + "px"
                  })
                  for (var i = 0; i < length; i++) {
                        var dot = document.createElement("i");
                        $(dot).attr("class", "dot");
                        if (i == 0) {
                              $(dot).addClass("active");
                        }
                        cont.append(dot);
                  }
                  $(this.cont).append(cont);
            },
            createLF:function(){
                  var first=$(this.wrapper,this.cont).html();
                  $(this.wrapper,this.cont).append(first);
                  $(this.wrapper,this.cont).prepend(first);
            }
      });
})