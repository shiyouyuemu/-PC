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
                  this.slides = this.cont.find(options.slides);
                  this.type=="change"?this.createLF():"";
                  this.slides = this.cont.find(options.slides);
                  this.distance=$(this.slides[1]).width()+parseInt($(this.slides[1]).css("marginRight"))+2;
                  this.index = -1;
                  this.previndex = 0;
                  this.playTimer = null;
                  this.auto ? this.autoPlay() : "";
                  this.dot ? this.createDot() : "";
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
                  if (str === "next") {
                        this.previndex = this.index;
                        if (this.index === this.slides.length - 1) {

                              this.index = 0;
                        } else {
                              this.index++;
                        }
                  } else if (str === "prev") {
                        this.previndex = this.index;
                        if (this.index === 0) {
                              this.index = this.slides.length - 1;
                        } else {
                              this.index--;
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
                              if(this.index==0){
                                    $(this.wrapper).css({
                                          left:-8*this.distance+"px"
                                    });
                                    this.index=9;
                              }else if(this.index==this.slides.length -7){
                                    $(this.wrapper).css({
                                          left:-8*this.distance+"px"
                                    });
                                    this.index=9;
                              }
                                    $(this.wrapper).animate({
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
                  $(this.content).append(cont);
            },
            createLF:function(){
                  // var first=this.slides.last().prop("outerHTML");;
                  // var last=this.slides.first().prop("outerHTML");;
                  // $(this.wrapper).append(last);
                  // $(this.wrapper).prepend(first);
                  var first=$(this.wrapper).html();
                  $(this.wrapper).append(first);
                  $(this.wrapper).prepend(first);
            }
      });
})