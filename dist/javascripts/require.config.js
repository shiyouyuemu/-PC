requirejs.config({
      paths:{
            "jquery" : "https://cdn.bootcss.com/jquery/3.4.1/jquery",
            "cookie":"https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie",
            "template":"https://cdn.bootcss.com/template_js/0.7.1-1/template",
            // 路径的起点 : 谁加载了config文件,那么就由作为路径的起点,以这个 起点开始编写相对路径;
            "banner" : "./javascripts/banner",
            "goback" : "./javascripts/goback",
            "render": "./javascripts/render",
            "register"  : "./javascripts/register",
            "login":"./javascripts/login",
            "formcheck":"./javascripts/formcheck",
            "shoppingCart":"./javascripts/shoppingCart",
            "login_main":"./javascripts/login_main",
            "register_main":"./javascripts/register_main",
            "autoLogin":"./javascripts/autoLogin",
            "index_main":"./javascripts/index_main",
            "details_main":"./javascripts/details_main",
            "shoppingCart_main":"./javascripts/shoppingCart_main",
            "list_main":"./javascripts/list_main",
            "sendSelf" :"./javascripts/sendSelf",
            "load":"./javascripts/load",
            "outLogin":"./javascripts/outLogin"
      }
})