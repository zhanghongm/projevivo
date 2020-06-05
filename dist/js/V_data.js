// 加载V抢购数据
define(['jquery'], function($) {
    function download(){
        $.ajax({
            type:"get",
            url:"../data/list1.json",
            success:function(res){
                // console.log(res);
                $.each(res,function(index, value){
                    // console.log(value);
                    $(`
                    <li>
                        <a href="">
                            <img src="${value.url}" alt="">
                        </a>
                        <div class="info">
                            <p class="name">${value.name}</p>
                            <p class="desc">${value.desc}</p>
                            <p class="price">
                                <span class="present"><em>￥</em>${value.text}</span>
                                <span class="origina"><em>￥</em>${value.textdisabled}</span>
                            </p>
                        </div>
                    </li>
                `).appendTo("#Jlist1");
                });
                $("#Jlist1").width($("#Jlist1 li").size() * $("#Jlist1 li").eq(0).outerWidth(true));

            },
            error:function(msg){
                console.log(msg);
            }
        });

    }

    // 滚动
    function tab(){
        var num = 4;//列表显示的图片个数
        $("#gt").on("click",function(){//右
            var li = $("#Jlist1 li");
            if(li.size() > num){
                num++;
                $("#lt").css({'color': '#333','border':'#333 1px solid'});

                if(li.size() == num){
                    $("#gt").css({'color': '#fff','border':'#fff 1px solid'});
                }
                $("#Jlist1").animate({
                    left: -(num - 4) * li.eq(0).outerWidth(true)
                });
            }
        });
        $("#lt").on("click",function(){//左
            var li = $("#Jlist1 li");
            if(num > 4){
                num--;
                $("#gt").css({'color': '#333','border':'#333 1px solid'});

                if(num <= 4){
                    $("#lt").css({'color': '#fff','border':'#fff 1px solid'});

                }
                $("#Jlist1").animate({
                    left: -(num - 4) * li.eq(0).outerWidth(true)
                });
            }
        });
        
    }  ;
    // 倒计时
    function djs(){
            var endTime = new Date();
            endTime.setHours(23,59,00);
            var nowTime = new Date();
            var time = endTime - nowTime;
            var h = Math.floor(time/1000/60/60%24);
            var m = Math.floor(time/1000/60%60);
            var s = Math.floor(time/1000%60);
            $("#end #hours").html(h);
            $("#end #min").html(m);
            $("#end #sec").html(s);
            if(time <= 1){
                clearInterval(timer);

            }
    }
    var timer = setInterval(djs,1000);

   
 
    return{
        download:download,
        tab:tab,
        
    }
});