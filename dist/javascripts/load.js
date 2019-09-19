(function(factory){
    if(typeof define ==="function"&&define.amd){
        define(["jquery","template"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.load=function(options){
        new Load().init(options);
    }
    function Load(){}
    $.extend(Load.prototype,{
        init:function(options){
            let str=window.location.search;
            this.tvalue=str.split("=")[1];
            this.tname=str.split("=")[0].split("?")[1];
            options.ls?this.ls=options.ls:this.ls="details"+this.tvalue;
            options.cont?this.cont=options.cont:"";
            options.template?this.templates=options.template:"";
            options.cont2?this.cont2=options.cont2:"";
            options.template2?this.templates2=options.template2:"";
            this.load();
            // $(window).on("beforeunload",function(){
            //     this.ls!="cartItem"?localStorage.removeItem(this.ls):"";
            //     localStorage.setItem("nowid",window.location.href);
            // }.bind(this));
        },
        load:function(){
            var data=localStorage.getItem(this.ls);
            data=JSON.parse(data);
            data={
                data
            };
            var html = template($(this.templates).html(), data);
            $(this.cont).html(html);
            var html2="";
            if(this.template2!="undifined"){
                html2 = template($(this.templates2).html(), data);
                $(this.cont2).html(html2);
            }
        }
    });
});