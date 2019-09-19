define([
    'autoLogin',
    'render',
    "shoppingCart",
    "load",
    "addCart",
    "sendSelf",
    "banner",
    "outLogin"
], function(autoLogin, render,shoppingCart,sendSelf,banner) {
    $(".header_left").autoLogin({
    });
    var obj=JSON.parse(localStorage.getItem("cartItem"));
    if(obj&&obj.data.length>0){
        $("body").load({
            ls:"cartItem",
            template:"#cartCont",
            cont:".wrapper_settlement"
        });
        $("body").addCart({
            num:".num_num",
            btn:".num_btn",
            addcont:".num_btn"
        });
        setTimeout(function () {
            $("body").sendSelf({
                item: ".item"
            });
        }, 1000);
    }else{
        $(".wrapper_ele").css({
            display:"block"
        });
    }
    $("body").shoppingCart({
        cartNum:".cartNum"
    })
    $(".wrapper_list").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "10",
        chid: "17",
        start: parseInt(Math.random() * 100),
        templates: "#banner_temp",
        cont: ".wrapper"
    });
    setTimeout(function () {
        $("body").sendSelf({
            item: ".item"
        });
        $(".wrapper_list").banner({
            btns:{
                prev_btn:".prev",
                next_btn:".next"
            },
            auto:true,
            type:"change",
            slides:".slide",
            cont:".wrapper_list",
            num:10,
            changeNum:5
        });
    }, 1000);
});
//改变物品数量时改变价格
//选中物品与否时改变价格