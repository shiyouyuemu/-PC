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
                    ];
            this.ifOk=[0,0,0,0];
            this.options=options;
            this.options.account?this.acc=this.options.account:this.ifOk[0]=1;
            this.options.password?this.pwd=this.options.password:this.ifOk[1]=1;
            this.options.repassword?this.rpwd=this.options.repassword:this.ifOk[2]=1;
            this.options.verification?this.ver=this.options.verification:this.ifOk[3]=1;
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
            this.options.repassword?$(this.rpwd,this.that).on("blur",function(){
                _.rpwdCheck.bind(this)(_);
            }):"";
            this.options.verification?$(this.ver,this.that).on("blur",function(){
                _.verCheck(_);
            }):"";
            this.options.randomVerification?$(this.rom,this.that).on("click",function(){
               _.randomVerification(_);
               _.verCheck(_);
            }):"";
        },
        accCheck:function(_){
            if(!_.key[0].test(this.value)){
                this.value="";
                $(this).css({
                    borderColor:"red"
                });
                $("#atxt").length!=0?"":$(_.acc).parentsUntil("li").append($("<span id='atxt' style='color:red;font-size:12px; position:absolute;bottom:-14px;background:none; right:0;'>手机号格式不正确</span>"));
                _.ifOk[0]=0;
            }else{
                $(this).css({
                    borderColor:"green"
                });
                _.ifOk[0]=1;
                $("#atxt").length!=0?$("#atxt").remove():"";
            }
            _.changeIfOk(_);
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
                $("#ptxt").length!=0?"": $(_.pwd).parentsUntil("li").append($("<span id='ptxt' style='color:red;font-size:12px; position:absolute;bottom:-14px;background:none; right:0;'>密码格式不正确</span>"));
                _.ifOk[1]=0;
            }else{
                $(this).css({
                    borderColor:"green"
                });
                _.ifOk[1]=1;
                $("#ptxt").length!=0?$("#ptxt").remove():"";
            }
            _.changeIfOk(_);
        },
        rpwdCheck:function(_){
            var pwd=$(_.pwd).val();
            var rpwd=$(_.rpwd).val();
            if(pwd===rpwd&&rpwd!=""){
                $(this).css({
                    borderColor:"green"
                });
                _.ifOk[2]=1;
                $("#rtxt").length!=0?$("#rtxt").remove():"";
            }else{
                $(this).css({
                    borderColor:"red"
                });
                _.ifOk[2]=0;
                $("#rtxt").length!=0?"":$(_.rpwd).parentsUntil("li").append($("<span id='rtxt' style='color:red;font-size:12px; position:absolute;bottom:-14px;background:none; right:0;'>两次密码不相同</span>"));
            }
            _.changeIfOk(_);
        },
        verCheck:function(_){
            var ver=$(_.ver);
            if(_.verCode===ver.val()){
                ver.css({
                    borderColor:"green"
                });
                _.ifOk[3]=1;
                $("#vtxt").length!=0?$("#vtxt").remove():"";
            }else{
                ver.css({
                    borderColor:"red"
                });
                _.ifOk[3]=0;
                $("#vtxt").length!=0?"": $(_.ver).parentsUntil("li").append($("<span id='vtxt' style='color:red;font-size:12px; position:absolute;bottom:-14px;background:none; line-height:12px; right:0;'>验证码错误</span>"));
            }
            _.changeIfOk(_);
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
            
        },
        changeIfOk:function(_){
            var num=0;
            var nam=0;
            $.each(_.ifOk,((index,item)=>{
                num+=item;
                nam++;
            }))
            if(num===nam){
                $(_.that).attr("ifOk",true);
            }else{
                $(_.that).attr("ifOk",false);
            }
            
        }
    })
})