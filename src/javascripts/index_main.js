define([
    "autoLogin",
    "render",
    "sendSelf",
    "outLogin"
], function (autoLogin, render, sendSelf) {

    $("#username").autoLogin();
    $("#box_one").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "20",
        chid: "0",
        start: "0",
        templates: "#box_one",
        cont: "#boxOne"
    });
    $("#box_zhuangban").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "5",
        start: "0",
        templates: "#box_zhuangban",
        cont: "#boxZhuangban"
    });
    $("#box_gufeng").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "6",
        start: "0",
        templates: "#box_gufeng",
        cont: "#boxGufeng"
    });
    $("#box_hanfeng").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "15",
        start: "0",
        templates: "#box_hanfeng",
        cont: "#boxHanfeng"
    });
    $("#box_shoushi").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "12",
        start: "0",
        templates: "#box_shoushi",
        cont: "#boxShoushi"
    });
    $("#box_lingshi").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "10",
        start: "0",
        templates: "#box_lingshi",
        cont: "#boxLingshi"
    });
    $("#box_fushi").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "8",
        start: "0",
        templates: "#box_fushi",
        cont: "#boxFushi"
    });
    $("#box_zhoubian").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "16",
        start: "0",
        templates: "#box_zhoubian",
        cont: "#boxZhoubian"
    });
    $("#box_shouban").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "8",
        chid: "13",
        start: "0",
        templates: "#box_shouban",
        cont: "#boxShouban"
    });
    $("#box_guess").render({
        url: "/cyc",
        c: "page",
        a: "page",
        nums: "5",
        chid: "17",
        start: parseInt(Math.random() * 100),
        templates: "#box_guess",
        cont: "#boxGuess"
    });
    setTimeout(function () {
        $("body").sendSelf({
            item: ".item"
        });
    }, 1000);
});