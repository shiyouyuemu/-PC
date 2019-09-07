console.log("build 模式开启！");
const gulp=require("gulp");
const clean=require("gulp-clean");
const babel=require("gulp-babel");
const sourcemaps=require("gulp-sourcemaps");
const uglify=require("gulp-uglify");
const htmlmin=require("gulp-htmlmin");
const cssmin=require("gulp-cssmin");
const rename=require("gulp-rename");
const {paths}=require("./config/gulp.config");

const disPaths=[];

for(let attr in paths){
    disPaths[attr]=paths[attr].replace(/src/g,"dist");
}
async function hanlderClean(){
    await gulp.src(disPaths.javascript+"*.js")
    .pipe(clean());
    await gulp.src(disPaths.html+"*.html")
    .pipe(clean());
    await gulp.src(disPaths.style+"*.css")
    .pipe(clean());
}
async function javascript(){
    await gulp.src([paths.javascript+"*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets:["@babel/env"]
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(disPaths.javascript+"*.js"))
}

async function html(){
    await gulp.src([paths.html+"*.html"])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets:["@babel/env"]
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(disPaths.html+"*.html"))
}

async function css(){
    await gulp.src([paths.style+"*.css"])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets:["@babel/env"]
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(disPaths.style+"*.css"))
}

gulp.task(css);
gulp.task(javascript);
gulp.task(html);
gulp.task(hanlderClean);
gulp.task("build",gulp.parallel("hanlderClean","javascript","css","html"))







