// 数据
define(["jquery","jquery-cookie"],function($){
    //获取列表传来的id
    var sid = location.search.substring(1);
    if(!sid){
        sid = 1001
    };
    function download(){  
        sc_num();//加载完后先计算一次
        $.ajax({
            type:"get",
            url:"../data/listpage.json",
            data:{
                sid:sid
            },
            success:function(res){
                for(var i = 0; i < res.shouji.length; i++){
                    if(sid == res.shouji[i].id){
                        $("#smallpic img").attr('src',res.shouji[i].img);
                        $("#bigpic").attr('src',res.shouji[i].img);
                        $("#right .title").html(res.shouji[i].name);
                        $("#right .desc").html(res.shouji[i].desc);
                        $("#right span i").html(res.shouji[i].present);
                        var smallp = res.shouji[i].smallpic;
                        for(var j = 0; j < smallp.length; j++){
                            // console.log(smallp[j].img)//下面小图路径
                            $(`
                                <li><img src=${smallp[j].img} alt=""></li>
                            `).appendTo($("#xt"))
                        }
                    }
                    
                }   
            },
            error:function(msg){
                console.log(msg)
            }
        });  
    }
    // 加入购物车
    function shoping(){
        // 加入购物车
        $("#right .shopcar").on('click',function(){
            // alert(sid);
            //判断是否第一次添加,cookie  [{id:id,num:1},{id:id,num:1}]要存json格式字符串
            var first = $.cookie('goods') == null ? true : false;
            if(first){
                var arr = [{id:sid,num:1}];
                $.cookie('goods',JSON.stringify(arr),{
                    expires:5
                });
            }else{
                //判断之前是否添加过
                var cookieArr = JSON.parse($.cookie('goods'));//从cookie中取goods并转为数组
                var same = false;//默认代表之前没添加过
                for(var i = 0; i <cookieArr.length; i++){
                    if(cookieArr[i].id == sid){
                        same = true;
                        cookieArr[i].num++;
                        break;
                    }
                    
                }
                    //之前没添加过
                if(!same){
                    var obj = {id:sid,num:1};
                    cookieArr.push(obj);
                }
                //将修改完的数据存回去
                $.cookie('goods',JSON.stringify(cookieArr),{
                    expires:5
                });
            }
            // console.log($.cookie('goods'))
            sc_num()//重新计算
        })
       
    }


     // 计算购物车中商品的数量
     function sc_num(){
        var cookieStr = $.cookie('goods');//取的cookie是字符串
        if(cookieStr){//存在
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;//累加
            }
            $(".icon").find(".sc_num").html(sum);

        }else{//不存在
           $(".icon").find(".sc_num").html(0);
        }
    }

    return{
        download:download,
        shoping:shoping
    }
})