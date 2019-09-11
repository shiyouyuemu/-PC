requirejs.config({
      paths:{
            "jquery" : "https://cdn.bootcss.com/jquery/3.4.1/jquery",
            // 路径的起点 : 谁加载了config文件,那么就由作为路径的起点,以这个 起点开始编写相对路径;
            "banner" : "./javascripts/banner",
            "goback" : "./javascripts/goback",
            "render": "./javascripts/render",
            "register"  : "./javascripts/register",
            "login":"./javascripts/login",
            "formcheck":"./javascripts/formcheck",
            "shoppingCart":"./javascripts/shoppingCart",
            "main":"./javascripts/main"
      }
})