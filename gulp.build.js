// console.log("build 模式");

const gulp = require("gulp");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const sourcemaps = require("gulp-sourcemaps");
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
sass.compiler = require('node-sass');

const {paths} = require("./config/gulp.config");

const distPaths = {};

for(let attr in paths){
      distPaths[attr] = paths[attr].replace(/src/g,"dist");
}


// 目标 : 1. 压缩 html , js , css 代码;
// 清空文件夹插件;

async function handlerClean(){
      await gulp.src( distPaths.javascript + "*.js")
      .pipe(clean());
      await gulp.src( distPaths.style + "*.css")
      .pipe(clean());
      await gulp.src( distPaths.html + "*.html")
      .pipe(clean());
}

async function scss(){
      await gulp.src(["./src/scss/*.scss"])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(cssmin())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./dist/css/"))
}

async function javascript(){
      await gulp.src([paths.javascript + "*.js"])
      .pipe(sourcemaps.init())
      .pipe(babel({
            presets : ["@babel/env"]
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(distPaths.javascript))
}
async function html(){
      await gulp.src([paths.html + "*.html"])
      .pipe(htmlmin({collapseWhitespace : true}))
      .pipe(gulp.dest( distPaths.html))
}
async function css(){
      await gulp.src([paths.style + "*.css"])
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest( distPaths.style))
}

gulp.task(html);
gulp.task(css);
gulp.task(scss);
gulp.task(javascript);
gulp.task(handlerClean);
gulp.task("build" , gulp.series("handlerClean","javascript","css","scss","html"));
