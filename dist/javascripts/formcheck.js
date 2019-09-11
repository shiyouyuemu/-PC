(function(factory){
    if(typeof define =="function"&&define.amd){
        define(["jquery"],factory);
    }else{
        factory(jQuery);
    }
})(function($){
    $.fn.formcheck=function(options){
        new Formcheck().init(this,options);
    }
    function Formcheck(){}
    $.extend(Formcheck.prototype,{
        init:function(that,options){
            this.that=that;
            this.romList=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z"]
            this.key=[/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                    [/\d/,/[a-zA-Z]/,/[!@#\$%&\*_]/,/^.{6,20}$/]
                    ]
            this.options=options;
            this.options.account?this.acc=this.options.account:"";
            this.options.password?this.pwd=this.options.password:"";
            this.options.verification?this.ver=this.options.verification:"";
            this.options.randomVerification?this.rom=this.options.randomVerification:"";
            this.bindEvent();
            this.randomVerification(this);
        },
        bindEvent:function(){
            var _=this;
            this.options.account?$(this.acc,this.that).on("blur",function(){
                _.accCheck.bind(this)(_);
            }):"";
            this.options.password?$(this.pwd,this.that).on("blur",function(){
                _.pwdCheck.bind(this)(_);
            }):"";
            this.options.verification?$(this.ver,this.that).on("blur",function(){
                _.verCheck(_);
            }):"";
            this.options.randomVerification?$(this.rom,this.that).on("click",function(){
               _.randomVerification(_);
            }):"";
        },
        accCheck:function(_){
            if(!_.key[0].test(this.value)){
                this.value="";
                $(this).css({
                    borderColor:"red"
                });
                alert("手机号格式错误！");
            }else{
                $(this).css({
                    borderColor:"green"
                });
            }
        },
        pwdCheck:function(_){
            var k=0;
            for (var index in _.key) {
                if (_.key[1][index].test(this.value)) {
                    k++;
                }else{
                    if(index===3){
                        k=0;
                    }
                }

            }
            if(k<2){
                this.value="";
                $(this).css({
                    borderColor:"red"
                });
                alert("密码格式错误！");
            }else{
                $(this).css({
                    borderColor:"green"
                });
            }
        },
        verCheck:function(_){
            var ver=$(_.ver);
            if(_.verCode===ver.val()){
                ver.css({
                    borderColor:"green"
                });
            }else{
                ver.css({
                    borderColor:"red"
                });
                alert("验证码错误！");
            }
        },
        randomVerification:function(_){
            
            var str="";
            var rom=$(_.rom);
            rom.text("");
            for(var i=0;i<8;i++){
                str+=_.romList[parseInt(Math.random()*35)];
            }
            rom.text(str);
            _.verCode=str;
        }
    })
})