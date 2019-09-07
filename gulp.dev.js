console.log("dev 模式开启！");
const gulp=require("gulp");
const connect=require("gulp-connect");
const proxy=require("http-proxy-middleware");
const proxyList=require("./config/gulp.config");
const sass=require("gulp-sass");
sass.compiler=require("node-sass");

async function hanlderConnect(){
    await connect.server({
        root:"./dist",
        port:8888,
        livereload:true,
        middleware:function(connect,opt){
            let list=[];
            for(let attr in proxyList){
                let url="/"+attr;
                let key="^/"+attr;
                list.push(
                    proxy(url,{
                        target:proxyList[attr],
                        changeOrigin:true,
                        pathRewrite:{
                            [key]:""
                        }
                    })
                )
            }
            return list;
        }
    });
}
function javascript(done){
    gulp.src(["./src/javascripts/*.js"])
    .pipe(gulp.dest("./dist/javascripts"))
    .pipe(connect.reload())
    done();
}
function html(done){
    gulp.src(["./src/*.html"])
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload())
    done();
}
function css(done){
    gulp.src(["./src/styles/*.css"])
    .pipe(gulp.dest("./dist/styles"))
    .pipe(connect.reload())
    done();
}
async function scss(){
    await gulp.src(["./src/scss/*.scss"])
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(connect.reload())
}
async function watch(){
    await gulp.watch(["./src/javascripts/*.js"],gulp.series("javascript"));
    await gulp.watch(["./src/styles/*.css"],gulp.series("css"));
    await gulp.watch(["./src/scss/*.scss"],gulp.series("scss"));
    await gulp.watch(["./src/*.html"],gulp.series("html"));
}
gulp.task(watch);
gulp.task(hanlderConnect);
gulp.task(css);
gulp.task(scss);
gulp.task(javascript);
gulp.task(html);
gulp.task("dev",gulp.parallel("watch","hanlderConnect"));














