console.log("加载成功");

require.config({
    paths:{
        // 后缀可省略
        // 路径是根据main.js的路径
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "banner":"banner"
    },
    shim:{
        // 设置依赖关系
        "jquery-cookie":["jquery"],

    }
})
// 通过require引入banner模块
require(["banner","V_data","data"],function(banner,V_data,data){
    banner.download();//调用banner模块对外暴露的download方法
    banner.banner1();
    // V抢购数据
    V_data.download();
    V_data.tab();
    
    // 主页数据
    data.download();
})