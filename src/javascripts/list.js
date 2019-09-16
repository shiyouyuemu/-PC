(function(factory){
    if(typeof define =="function"&&define.amd){
        define(["jquery"],factory);
    }
})(function($){
    $.fn.list=function(options){
        new List().init(this,options);
    }
    function List(){}
    $.extend(List.prototype,{
        init:function(that,options){
            options?this.options=options:"";
            this.cont=options.cont;
            this.templates=options.templates;
            this.typeList=options.typeList;
            this.start=options.start;
            this.nums=16;
            this.typeArr=[0,17,15,13,12,10,11,6,5,16,8];
            options.typeList?this.getType():"";
            this.rending();
        },
        getType:function(){
            let str=window.location.search;
            var tvalue=str.split("=")[1];
            var tname=str.split("=")[0].split("?")[1];
            this.chid=this.typeArr[parseInt(tvalue)];
            $(this.typeList+" li a").removeClass("active");
            $(this.typeList+" li a").eq(parseInt(tvalue)).addClass("active");
        },
        rending:function(){
            $("#box_shouban").render({
                url: "/cyc",
                c: "page",
                a: "page",
                nums: this.nums,
                chid: this.chid,
                start: this.start,
                templates: this.templates,
                cont: this.cont
            });
            
            
        }
    });
})