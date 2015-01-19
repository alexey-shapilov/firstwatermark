var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false
    }),
    fs = require('fs');
productionPath = './app/';
tmpPath = '.tmp/';

$.gulp.task('build-app', function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er
    });
    $.gulp.src(['./_dev/_server/.htaccess', './_dev/_server/**/*.php'])
        .pipe($.wiredep.stream({
            directory: '_dev/_bower',
            fileTypes: {
                php: {
                    block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                        js: /<script.*src=['"]([^'"]+)/gi,
                        css: /<link.*href=['"]([^'"]+)/gi
                    },
                    replace: {
                        js: '<script src="{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="{{filePath}}" />'
                    }
                }
            }
        })).on('error', log)
        .pipe(assets).on('error', log)
        //.pipe($.if('*.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(function (file) {
            return file.base.substr((file.cwd + '/_dev/_server').length + 1);
        }, {cwd: productionPath})).on('error', log);
    $.gulp.src('./_dev/_server/uploads')
        .pipe($.gulp.dest('./app/'));
});


$.gulp.task('sass', function () {
    $.gulp.src(['./_dev/_sass/style.scss'])
        .pipe($.compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_sass')).on('error', log);
});

// Задачи необходимы если хотим собрать проект без php ====================================

//
// Собираем jade
//
$.gulp.task('jade', function () {
    return $.gulp.src('./_dev/_jade/_pages/*.jade')
        .pipe($.jade({
            pretty: true
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_jade/_pages'));
});

//
// Собираем js
//
$.gulp.task('js', ['jade'], function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        if (er) throw er;
    });
    return $.gulp.src('./_dev/_jade/_pages/*.html')
        .pipe($.wiredep.stream({
            directory: './_dev/_bower'
        }))
        .pipe(assets).on('error', log)
        .pipe($.if('*.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(productionPath)).on('error', log);
});

//
//====================================
//

$.gulp.task('watch', ['js'], function () {
    $.gulp.watch('./_dev/_jade/_pages/*.jade', ['jade']);
    $.gulp.watch(['./_dev/_jade/_pages/*.html', './_dev/_js/*.js', './_dev/_js/_vendor/*.js'], ['js_watch']);
    $.gulp.watch(productionPath + '/**/*', $.browserSync.reload);
    $.gulp.watch('./_dev/_server/ajax/*.php', ['server-ajax']);
    $.gulp.watch('bower.json', ['wiredep']);
    // $.gulp.watch('./_server/**/*.php', ['build']);

    // Перезагрузка браузера на любое изменение в конечной директории
    // Немного избыточно, т.к. перезагружает браузер на каждый чих в productionPath
    // Зато работает
    $.gulp.watch(productionPath + '/**/*', $.browserSync.reload);

});


function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

