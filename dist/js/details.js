define(["jquery"],function($){
    var smallpic = $("#smallpic");//小框
    var sbox = $("#sbox");//小放大镜
    var bbox = $("#bbox");//大放大镜
    var bigpic = $("#bigpic");//大图
    function enlarge(){
        smallpic.hover(function(){
            sbox.css("display","block");
            bbox.css("display","block");
            $(this).on("mousemove",function(ev){
               var e = ev || window.event;
               var l = e.pageX - $(".left").offset().left - sbox.width() / 2;
               var t = e.pageY - $(".left").offset().top - sbox.height() / 2;
               if(l < 0){
                    l = 0;
                }else if(l >= smallpic.width() - sbox.width()){
                    l = smallpic.width() - sbox.width();
                };
                if(t < 0){
                    t = 0;
                }else if(t >= smallpic.height() - sbox.height()){
                    t = smallpic.height() - sbox.height();
                }
                sbox.css({
                    left:l + 'px',
                    top:t + 'px',
                });

                bigpic.css({
                    left: -l * 2 + 'px',
                    top: -t * 2 + 'px'
                });
            });
           

        },function(){
            sbox.css("display","none");
            bbox.css("display","none");

        })
    };

    // 小图切换
    function tab(){
        // 事件委托
        $("#img ul").on('click','li',function(){
            var imgurl = $(this).find('img').attr('src');
            var small = $("#smallpic img");
            var big = $("#bigpic");
            small.attr('src',imgurl);
            big.attr('src',imgurl);
        })
    };

    return{
        enlarge:enlarge,
        tab:tab
    }
})