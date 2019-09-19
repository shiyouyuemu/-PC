(function (factory) {
    if (typeof define == "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.addCart = function (options) {
        new AddCart().init(this, options);
    }

    function AddCart() {}
    $.extend(AddCart.prototype, {
        init: function (that, options) {
            this.that = that;
            this.options = options;
            options.num ? this.num = options.num : "";
            options.btn ? this.btn = options.btn : "";
            options.add ? this.add = options.add : "";
            options.addcont ? this.addcont = options.addcont : "";
            options.addcont ? "" : this.cont = parseInt($(this.num).val());
            this.bindEvent();
            this.start();
        },
        bindEvent: function () {
            var _ = this;
            this.btn ? $(this.btn).on("click", function () {
                _.changeNums.bind(this)(_);
            }) : "";
            this.add ? $(this.add).on("click", function () {
                _.addCart.bind(this)(_);
            }) : "";
            this.addcont ? $(this.addcont).on("click", function () {
                _.addCont.bind(this)(_);
            }) : "";
            this.choose();
            this.removeCommodity();
            this.removeSelected();
        },
        changeNums: function (_) {
            console.log(1)
            _.parent = _.addcont ? $(this).parentsUntil(".table_wrap", ".table_item") : "body";
            _.cont = parseInt($(_.num, _.parent).val());
            var type = $(this).text();
            _.tname = $(".title_name", _.parent).text();
            switch (type) {
                case "+":
                    _.cont += 1;
                    break;
                case "-":
                    if (_.cont == 1) {
                        break;
                    }
                    _.cont -= 1;
                    break;
            }
            $(_.num, _.parent).val(_.cont);
        },
        changeNum:function(){
            var cont=0;
            var arr = (localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : {data: [],cont:0});
            for (var item in arr.data) {
                    cont+=arr.data[item].cont;              
            } 
            arr.cont=cont;
            localStorage.setItem("cartItem", JSON.stringify(arr));
            $("body").shoppingCart({
                cartNum:".cartNum"
            });
        },
        addCart: function (_) {
            let str=window.location.search;
            var tvalue=str.split("=")[1];
            var tname=str.split("=")[0].split("?")[1];
            var obj=null;
            tname=="id"?obj = localStorage.getItem("details"+tvalue):"";
            obj = JSON.parse(obj);
            obj.cont = _.cont;
            var ifPush = true;
            var arr = (localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : {data: [],cont:0});
            for (var item in arr.data) {
                if (obj.name == arr.data[item].name) {
                    arr.data[item].cont = parseInt(arr.data[item].cont) + obj.cont;
                    ifPush = false;
                }
            }
            
            if (ifPush) {
                arr.data.push(obj);
            }
            localStorage.setItem("cartItem", JSON.stringify(arr));
            _.changeNum();
        },
        addCont: function (_) {
            var arr = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : {
                data: []
            };
            for (var item in arr.data) {
                if (_.tname == arr.data[item].name) {
                    arr.data[item].cont = _.cont;
                    $(".table_sum", _.parent).text(_.cont * arr.data[item].price);
                }
            }
            var gparent = $(this).parentsUntil(".table_cont", ".table_items");
            localStorage.setItem("cartItem", JSON.stringify(arr));
            _.smallAdd.bind(this)(gparent);
            _.bigAdd();
            //location.reload();
        },
        smallAdd: function (gparent) {
            var array = $(".table_item", gparent);
            var sum = 0; //物品费用
            var fsum = 0; //运费
            var cont = 0; //物品数量
            this.smallNum=0;
            for (var i = 0; i < array.length; i++) {
                if ($(".ifChoose", array[i]).attr("ifChoose") == "true") {
                    sum += parseFloat($(".table_sum", array[i]).text());
                    cont += parseInt($(".num_num", array[i]).val());
                    if (parseFloat($(".table_sum", array[i]).text()) < 68) {
                        fsum += 10;
                    }
                    this.smallNum++;
                }

            }
            $(gparent).attr("cont", cont);

            if (fsum == 0) {
                fsum = "本次包邮";
            }
            if (sum == 0) {
                $(".allbtn_cont i", gparent).attr("ifChoose", "false");
                $(".allbtn_cont i", gparent).removeClass("on");
            } else  if(array.length==this.smallNum){
                $(".table_type .allbtn_cont i", gparent).attr("ifChoose", "true");
                $(".table_type .allbtn_cont i", gparent).addClass("on");
            }else{
                $(".table_type .allbtn_cont i", gparent).attr("ifChoose", "false");
                $(".table_type .allbtn_cont i", gparent).removeClass("on");
            }
            $(".price", gparent).text(sum);
            $(".freight", gparent).text(fsum);
        },
        addColor: function (_, obj, gparent) {
            obj ? obj = obj : obj = this;
            if ($(obj).attr("ifChoose") == "true") {
                $(obj).attr("ifChoose", "false");
                $(obj).removeClass("on");
            } else {
                $(obj).attr("ifChoose", "true");
                $(obj).addClass("on");
            }

        },
        choose: function () {
            var _ = this;
            $(".choose").on("click", function () {
                var gparent = $(this).parentsUntil(".table_cont", ".table_items");
                _.addColor(_, this);
                _.smallAdd.bind(this)(gparent);
                _.bigAdd();
            });
            $(".allChoose").on("click", function () {
                _.addColor(_, $(".allbtn_cont i", "body"));
                _.smallAdd.bind(this)();
                _.bigAdd();
            });
            $(".allchoose").on("click", function () {
                var gparent = $(this).parentsUntil(".table_cont", ".table_items");
                _.addColor(_, $(".allbtn_cont i", gparent));
                _.smallAdd.bind(this)(gparent);
                _.bigAdd();
            });
        },
        bigAdd: function () {
            var array = $(".table_items", "body");
            var sum = 0;
            var fsum = 0;
            var cont = 0;
            this.bigNum=0;
            for (var i = 0; i < array.length; i++) {
                if ($(".allbtn_cont i", array[i]).attr("ifChoose") == "true") {
                    this.bigNum++;
                }
                if ($(".table_type_right .price", array[i]).text() != "0") {
                    sum += parseFloat($(".price", array[i]).text());
                    if ($(".table_type_right .freight", array[i]).text() != "本次包邮") {
                        fsum += parseFloat($(".freight", array[i]).text());
                    }
                    cont += parseInt($(array[i]).attr("cont"));
                }
            }
            console.log(this.bigNum)
            $(".commodity_price").text(sum + fsum);
            if (sum == 0) {
                $(".allbtn_cont i", "body").attr("ifChoose", "false");
                $(".allbtn_cont i", "body").removeClass("on");
            } else if(array.length==this.bigNum){
               $(".allChoose").attr("ifChoose", "true");
               $(".allChoose").addClass("on");
            }else{
                $(".allChoose").attr("ifChoose", "false");
               $(".allChoose").removeClass("on");
            }
            $("#commodity_cont").text(cont);
            var obj = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) :{data:[],cont:0};
            obj.cont = cont;
            localStorage.setItem("cartItem", JSON.stringify(obj));
        },
        start: function () {
            var array = $(".table_items");
            for (var i = 0; i < array.length; i++) {
                this.smallAdd(array[i]);
            }
            this.bigAdd();
            this.changeNum();

        },
        removeCommodity: function () {
            var _ = this;
            $(".table_del").on("click", function () {
                var obj = $(this).parentsUntil(".table_items", ".table_item");
                var arr = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : {
                    data: []
                };
                var name = $(".title_name", obj).text();
                for (var item in arr.data) {
                    if (name == arr.data[item].name) {
                        arr.data.splice(item, 1);
                    }
                }
                var gparent = $(this).parentsUntil(".table_cont", ".table_items");
                localStorage.setItem("cartItem", JSON.stringify(arr));
                obj.remove();
                _.start();
                location.reload();
            });
        },
        removeSelected: function () {
            $(".removeSelected").on("click", function () {
                var array = $(".table_item");
                for (var i = 0; i < array.length; i++) {
                    if ($(".ifChoose", array[i]).attr("ifChoose") == "true") {
                        $(".table_del", array[i]).trigger("click");
                    }
                }
            });
        }
    })
})