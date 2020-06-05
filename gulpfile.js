const gulp = require("gulp");
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
//html
gulp.task("index-html",() => {
    return gulp.src("index.html")
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());

})
gulp.task("copy-html",() => {
    return gulp.src(["*.html","!index.html"])
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());

})
//css
gulp.task("indexScss",() => {
    return gulp.src("style/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("scssAll",() =>{
    return gulp.src("style/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
// font
gulp.task("font",() =>{
    return gulp.src("font/*")
    .pipe(gulp.dest("dist/font"))
    .pipe(connect.reload());
})
//js
gulp.task("scripts",() => {
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//图片
gulp.task("images",() => {
    return gulp.src("images/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
//数据
gulp.task("data",() => {
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//执行上述所有文件的任务
gulp.task("build",["index-html","copy-html","indexScss","scssAll","font","scripts","images","data"],() =>{
    console.log("项目建立成功");
})

//启动监听
gulp.task("watch",() =>{
    gulp.watch("*.html",["copy-html"]);
    gulp.watch("index.html",["index-html"]);
    gulp.watch("style/index.scss",["indexScss"]);
    gulp.watch("style/*.scss",["scssAll"]);
    gulp.watch("font/*",["font"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("images/*",["images"]);
    gulp.watch(["*.json","!package.json"],["data"]);

})

//启动临时服务器
const connect = require("gulp-connect");
gulp.task("server",() =>{
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})

//同时启动服务和监听，默认任务，直接gulp运行
gulp.task("default",["watch","server"]);