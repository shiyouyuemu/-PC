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
            options.cont?this.cont=options.cont:"";
            options.template?this.templates=options.template:"";
            options.cont2?this.cont2=options.cont2:"";
            options.template2?this.templates2=options.template2:"";
            this.load();
        },
        load:function(){
            var data=localStorage.getItem("details");
            data=JSON.parse(data);
            data={
                data
            };
            
            var html = template($(this.templates).html(), data);
            $(this.cont).html(html);
            var html2 = template($(this.templates2).html(), data);
            $(this.cont2).html(html2);
        }
    });
});