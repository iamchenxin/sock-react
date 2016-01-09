/**
 * Created by iamchenxin on 1/7/16.
 */
var gulp = require('gulp');
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var path=require('path');


var babel_options={  "presets": ["es2015","stage-0","react"] };

gulp.task("src",function(){
   return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel(babel_options))
    .pipe(rename( function(path){
          path.basename+="-ccc";
    }))
    .pipe(sourcemaps.write(".",{includeContent: true, sourceRoot: __dirname+'/src',debug:true}))
    .pipe(gulp.dest('dst'));
});

var webpack = require("webpack");
var gutil = require("gulp-util");

// returns a Compiler instance
var web_compiler = webpack({
    entry:'./src/app/app.js',
    output:{
        path:path.join(__dirname,"dst/server/app"),
        filename:'app.js'
    },
    devtool:"source-map",
    module:{
        loaders:[
            {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader",
                query:{
                    presets:['es2015','react'],
                    "plugins": ["transform-class-properties","transform-decorators"]
                }
            }
        ]
    }

});

gulp.task("app",function(){

    console.log("compile app ...");
    web_compiler.run(function(err,stats){
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
    });

    console.log("copy html ...");
    gulp.src("src/app/**/*.html")
    .pipe(gulp.dest("dst/server/app/"));

});

gulp.task("app-w",function(){
   console.log("watching app ~~~~~~~~");
    web_compiler.watch({
        aggregateTimeout: 300, // wait so long for more changes
        poll: true // use polling instead of native watchers
    },function(err,stats){
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
    });
});

gulp.task("server",function(){

    gulp.src("src/server/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel(babel_options))
        .pipe(rename( function(path){
            path.basename+="-ccc";
        }))
        .pipe(sourcemaps.write(".",{includeContent: true, sourceRoot: __dirname+'/src/server',debug:true}))
        .pipe(gulp.dest('dst/server/'));

});