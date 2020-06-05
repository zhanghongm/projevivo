console.log("加载成功");
require.config({
    paths:{
        // 路径是根据主入口文件的路径
        "jquery":"jquery-1.11.3",
        "list":"list"
    },
    shim:{
        // 某个模块不遵从AMD规范
        "parabola":{
            exports:"_"
        }
    }
});

require(["list"],function (list) {
    list.download();
})