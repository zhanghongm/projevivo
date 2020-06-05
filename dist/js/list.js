define(["jquery"],function ($) {
    function download() {
        // 商品列表数据
        $.ajax({
            type:"get",
            url:"../data/listpage.json",
            success:function (res) {
                // console.log(res)
                var listarr = res.shouji;
                for(var i =0; i < listarr.length; i++){
                    $(`
                    <li>
                        <a href="./details.html?${listarr[i].id}"><img src="${listarr[i].img}" alt="">
                        </a>
                        <div class="info">
                            <p class="name">${listarr[i].name}</p>
                            <p class="desc">${listarr[i].desc}</p>
                            <p class="price">
                                <span class="present"><em>￥</em>${listarr[i].present}</span>
                            </p>
                        </div>
                    </li>
                    `).appendTo($("#list ul"))
                }
            },
            error:function (msg) {
                console.log(msg);
            }
        });
      
    }

    return{
        download:download
    }
})