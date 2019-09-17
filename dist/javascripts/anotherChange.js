(function(factory){
    if(typeof define=="function"&& define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.anotherChange=function(options){
        new AnotherChange().init(options);
    }
    function AnotherChange(){}
    $.extend(AnotherChange.prototype,{
        init:function(options){
            options?this.options=options:"";
            options.item?this.item=options.item:"";
            options.url ? this.url = options.url : "";
            options.c ? this.c = options.c : "";
            options.a ? this.a = options.a : "";
            options.nums ? this.nums = options.nums : "";
            options.chid ? this.chid = options.chid : "";
            options.start ? this.start = options.start : "";
            options.cont ? this.cont = options.cont : "";
            options.templates?this.templates=options.templates:"";
            options.li ? this.li = options.li : "";
            options.typeList ? this.typeList = options.typeList : "";
            this.bindEvent();
        },
        bindEvent:function(){
            $(this.cont).parentsUntil("#content",".attire_cont").find(this.item).on("click",this.change.bind(this));
        },
        change:function(){
            if(this.start<24){
                this.start=parseInt(this.start)+8;
            }else{
                this.start=0
            }
            $("#box_one").render({
                url: this.url,
                c: this.c,
                a: this.a,
                nums: this.nums,
                chid: this.chid,
                start: this.start,
                templates: this.templates,
                cont: this.cont,
                ifAdd:false
            });
            setTimeout(function(){
                $("body").lazyLoad({
                    li: this.cont+" "+this.li,
                    cont: this.cont,
                    templates: this.templates,
                    typeList: this.typeList,
                    chid:this.chid,
                    ifloading:false
                });
            }.bind(this),500);
            setTimeout(function () {
                $("body").sendSelf({
                    item: ".item"
                });
            }, 1000);
        }
    })

})