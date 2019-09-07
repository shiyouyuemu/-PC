let avg=process.argv;
let msg=avg.filter((item,index)=>index>1)[0];
msg?"":msg="build";
switch(msg){
    case "dev":
        const dev=require("./gulp.dev");
    break;
    case "build":
        const build=require("./gulp.build");
    break;
}