// console.log("dev 模式");

// 1. 转存 : gulp.src pipe gulp.dest 
// 2. 服务器gulp-connect ;  1.测试服务器;
//                          2.代理服务器
//                          3. 自动刷新; 

const gulp = require("gulp");
const connect = require("gulp-connect");
//phpserver
// const phpconnect=require("gulp-connect-php");
// const browserSync = require('browser-sync');

const proxy  = require("http-proxy-middleware");
const { proxyList } = require("./config/gulp.config");
const sass = require("gulp-sass");
sass.compiler = require('node-sass');


const {paths} = require("./config/gulp.config");

const distPaths = {};

for(let attr in paths){
      distPaths[attr] = paths[attr].replace(/src/g,"dist");
}


// 钩子函数 hook ;
async function hanlderConnect(){
      await connect.server({
            root : "./dist",
            port : 8888,
            livereload : true,
            middleware: function() {
                  let list = [];
                  for(let attr in proxyList){
                        let url = "/"+attr; 
                        let key = "^/"+attr;
                        list.push(
                              proxy(url ,{
                                    target : proxyList[attr],
                                    changeOrigin : true,
                                    pathRewrite : {
                                          [key]: ""
                                    }
                              })
                       )
                  }
                  return list;
                  
            }

      })
}

//phpserver

// gulp.task("php",function(done){
//       gulp.src([paths.php + "*.php"])
//       .pipe(gulp.dest(distPaths.php))
//       done();
// });
     

// gulp.task('connect-php', function(done) {
//   connect.server({
//      bin: 'E:/PHPTutorial/php/php-5.6.27-nts/php.exe',    //如果配置好php环境则不需要这一句，更换为你对应的php.exe文件
//      ini: 'E:/PHPTutorial/php/php-5.6.27-nts/php.ini',  //如果配置好php环境则不需要这一句
//     port: 3300,
//     base: './dist/server',
//     keepalive: true
//   });
//   done();
// });

// gulp.task('connect-sync', function(done) {
//   browserSync({
//     proxy: 'localhost:3300' , //监听127.0.0.1:3000下的内容
//     startPath: "./dist/server/login.php"     
//   });
//   //gulp.watch('*.php').on('change', reload);
//   gulp.watch(['./src/server/*.php'],gulp.series("php"));
//   done();
// });

/* JavaScript 转存*/
function javascript(done){
      gulp.src([paths.javascript + "*.js"])
      .pipe(gulp.dest(distPaths.javascript))
      .pipe(connect.reload())
      console.log(1)
      done();
}
function html(done){
      gulp.src([paths.html + "*.html"])
      .pipe(gulp.dest(distPaths.html))
      .pipe(connect.reload())
      done();
}
function css(done){
      gulp.src([paths.style + "*.css"])
      .pipe(gulp.dest(distPaths.style))
      .pipe(connect.reload())
      done();
}


async function scss(){
      await gulp.src([paths.scss + "*.scss"])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(distPaths.style))
      .pipe(connect.reload())

}

async function watch(){
     await gulp.watch(["./src/javascripts/*.js"],gulp.series("javascript"));
     await gulp.watch(["./src/*.html"],gulp.series("html"));
     await gulp.watch(["./src/style/*.css"],gulp.series("css"));
     await gulp.watch(["./src/scss/*.scss"],gulp.series("scss"));
}

gulp.task(watch)
gulp.task(scss)
gulp.task(css);
gulp.task(html);
gulp.task(javascript);
gulp.task(hanlderConnect);
gulp.task("dev" , gulp.parallel("watch","hanlderConnect"));