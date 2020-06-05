// 加载主页数据
define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(res){
                // console.log(res)
                var list2arr = res.list2;
                var list3arr = res.list3;
                var list4arr = res.list4;
                // console.log(list4arr);
                for(var i = 0; i < list2arr.length; i++){
                    $(`
                        <li>
                            <a href="">
                                <img src="${list2arr[i].url}" alt="">
                            </a>
                            <div class="info3">
                                <p class="name">${list2arr[i].name}</p>
                                <p class="desc">${list2arr[i].desc}</p>
                                <p class="price">￥${list2arr[i].price}</p>
                            </div>
                        </li>
                    `).appendTo(".floorlist-3 ul")
                };
                for(var i = 0; i < list3arr.length; i++){
                    $(`
                    <li>
                        <a href="">
                            <img src="${list3arr[i].url}" alt="">
                        </a>
                        <div class="info">
                            <p class="name">${list3arr[i].name}</p>
                            <p class="desc">${list3arr[i].desc}</p>
                            <p class="price">￥${list3arr[i].price}</p>
                        </div>
                    </li>
                    `).appendTo("#floorlist-4 ul")
                };
                for(var i = 0; i < list4arr.length; i++){
                    $(`
                    <li>
                        <a href="">
                            <img src="${list4arr[i].url}" alt="">
                        </a>
                        <div class="info">
                            <p class="name">${list4arr[i].name}</p>
                            <p class="desc">${list4arr[i].desc}</p>
                            <p class="price">￥${list4arr[i].price}</p>
                        </div>
                    </li>
                    `).appendTo("#floorlist-5 ul")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    

    return{
        download:download
    }
})