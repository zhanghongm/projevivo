// banner图  AMD规范
// define声明  jquery模块 通过$拿到
define(["jquery"],function($){
    function download(){
        //数据下载
        $.ajax({
            type:"get",
            url:"../data/banner.json",
            success:function(res){
                // console.log(res);
                var bannerArr = res.banner;
                // console.log(bannerArr)
                for(var i = 0; i < bannerArr.length;i++){
                    $(`
                        <li class="banner-img">
                            <img src="${bannerArr[i].url}" alt="">
                        </li>
                    `).appendTo(".banner");
                    var btn = $(`<div class="btn"></div>`);
                    if(i == 0){
                        btn.addClass("btnactive");
                    }
                    btn.appendTo(".btns");
                }

            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    // 轮播
    function banner1(){
        var iNow = 0;//当前显示的图片的下标
        var aImgs = null;//记录页面上所有的轮播图片
        var aBtns = null;//记录所有的小圆圈

        var timer = setInterval(function(){
            iNow++;
            tab();
        },2500)

        // 切换
        function tab (){
            if(!aImgs){
                aImgs = $(".banner").find("li");
            }
            if(!aBtns){
                aBtns = $(".btns").find("div");
            }
            if(iNow == 5){
                iNow = 0;
            }
            // 图片切换
            aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({opacity:1},500);
            // 按钮
            aBtns.removeClass("btnactive").eq(iNow).addClass("btnactive");
        }
        // 鼠标移入移出
        $(".banner,.btns").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2500)
        });

        // 小按钮 异步加载来的  事件委托
        $(".btns").on("click","div",function(){
            // alert($(this).index())
            iNow = $(this).index()
            tab();
        })

    }

    // 暴露
    return{
        download:download,
        banner1:banner1
    }
})