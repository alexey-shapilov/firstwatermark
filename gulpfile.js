var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false
    }),
    productionPath = './app/';

$.gulp.task('sass', function () {
    $.gulp.src(['./_dev/_sass/*.scss'])
        .pipe($.compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_sass')).on('error', log);
});


$.gulp.task('jade', function () {
    return $.gulp.src('./_dev/_jade/_pages/*.jade')
        .pipe($.jade({
            pretty: true
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_jade/_pages'));
});

$.gulp.task('js', ['jade'], function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er;
    });
    return $.gulp.src('./_dev/_jade/_pages/*.html')
        .pipe(assets).on('error', log)
        .pipe($.if('*.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(productionPath)).on('error', log);
});

$.gulp.task('js_watch', function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er;
    });
    return $.gulp.src('./_dev/_jade/_pages/*.html')
        .pipe(assets).on('error', log)
        .pipe($.if('*.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(productionPath)).on('error', log);
});

$.gulp.task('watch', ['js'], function () {
    $.gulp.watch('./_dev/_jade/_pages/*.jade', ['jade']);
    $.gulp.watch(['./_dev/_jade/_pages/*.html', './_dev/_js/*.js', './_dev/_js/_vendor/*.js'], ['js_watch']);
    $.gulp.watch(productionPath + '/**/*', $.browserSync.reload);
});

$.gulp.task('browser-sync', ['watch'], function () {
    $.browserSync({
        proxy: "localhost:8000"
    });
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