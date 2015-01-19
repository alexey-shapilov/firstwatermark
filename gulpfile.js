var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false
    }),
    productionPath = './app/';
    tmpPath = '.tmp/';

$.gulp.task('sass', function () {
    $.gulp.src(['./_dev/_sass/*.scss'])
        .pipe($.compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_sass')).on('error', log);
});


//
// Автоматически контролируем зависимости библиотек в index.jade
// в секциях bower:*
//
$.gulp.task('wiredep', ['jade'], function() {
    return $.gulp.src('./app/index.html')
        .pipe($.wiredep.stream({
            directory: './_dev/_bower'
        }))
        .pipe($.gulp.dest('./app/'));
});

//
// Собираем jade в app/index.html
//
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
//
// Копируем обработчики аякса из _dev/_server/_ajax в /app/ajax
//
$.gulp.task('server-ajax', function() {
    $.rimraf.sync(productionPath + 'ajax/', function (er) {
        if (er) throw er;
    });
    $.gulp.src('./_dev/_server/ajax/*.php').on('error', log)
    .pipe($.gulp.dest(productionPath + 'ajax/'));
});

//
// Собираем js/vendor.js и js/combined.js из секций build:js
//
$.gulp.task('build-new', ['wiredep'], function() {

    $.rimraf.sync(productionPath + 'js/', function (er) {
        if (er) throw er;
    });
    $.rimraf.sync(productionPath + 'css/', function (er) {
        if (er) throw er;
    });

    $.gulp.start('server-ajax');

    var assets = $.useref.assets();
    $.gulp.src('./app/index.html')
    .pipe(assets).on('error', log)
    .pipe($.if('*.js', $.uglify())).on('error', log)
    .pipe($.if('*.css', $.minifyCss())).on('error', log)
    .pipe(assets.restore()).on('error', log)
    .pipe($.useref()).on('error', log)
    .pipe($.gulp.dest('./app/')).on('error', log);

    // создаем пустую папку uploads
    $.gulp.src('./_dev/_server/uploads')
    .pipe($.gulp.dest('./app/'));
});

//
// Только копируем только js-файлы, без минификации и конкатенации
//
$.gulp.task('build-js-copy', function() {
    $.rimraf.sync(productionPath + 'js/', function (er) {
        if (er) throw er;
    });
    $.gulp.src('./_dev/_js/*.js').on('error', log)
    .pipe($.gulp.dest('./app/js/'));

    $.gulp.src('./_dev/_bower/**/*.js')
    .pipe($.gulp.dest('./app/js/vendor/'));
});

//
// Собираем js/vendor.css и js/combined.css из секций build:css
//
$.gulp.task('build-css', function() {
    var assets = $.useref.assets();

    $.gulp.src('./app/index.html')
    .pipe(assets).on('error', log)
    .pipe($.if('*.css', $.minify())).on('error', log)
    .pipe(assets.restore()).on('error', log)
    .pipe($.useref()).on('error', log)
    .pipe($.gulp.dest('./app/')).on('error', log);
});

//
// Livereload для браузеров
//
$.gulp.task('browser-sync', ['watch'], function () {
  $.browserSync({
    // server: {
    //   baseDir: productionPath
    // },
    proxy: "localhost:8000"
  });
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
    $.gulp.watch('./_dev/_server/ajax/*.php', ['server-ajax']);
    $.gulp.watch('bower.json',                ['wiredep']    );
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

