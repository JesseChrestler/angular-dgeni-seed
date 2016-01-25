/// <vs />
var gulp = require("gulp"),
    globby = require("globby"),
    fs = require("fs"),
    Dgeni = require("dgeni"),
    rimraf = require("gulp-rimraf")//,
    //config = require("./build.config")



var config = {
    src : {
        js : "src"
    },
    docs : {
        assets : "./docs/app/**/*",
        dest : "./build/docs",
        config : "./docs/config",
        content : "./docs/content"
    }
}

gulp.task("clean:docs", [], function(){
    return gulp.src(config.docs.dest)
    .pipe(rimraf());
});
gulp.task("copy:assets", ["clean:docs"], function(){
    return gulp.src(config.docs.assets)
        .pipe(gulp.dest(config.docs.dest));
});

gulp.task("build:docs", ["copy:assets"], function() {
    var dgeniConfig = require(config.docs.config)(
        //output folder
        config.docs.dest, 
        //source folder
        [
            //include your source code.
            {
                include: config.src.js + "/**/*.js",
                basePath: config.src.js 
            },
            //include all ngdoc files for base content
            {
                include: config.docs.content + "/**/*.ngdoc",
                basePath: config.docs.content 
            }
        ],
        //this is the javascript files used for live examples
        ["https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js", "/src/test.js"],
        //this is the css files used for live examples
        [],
        //this is the root path to both css & javascript for live examples (this would need to be the same for all included files)
        ""
    );
    var dgeniDocs = new Dgeni([dgeniConfig]);
    return dgeniDocs.generate();
});
