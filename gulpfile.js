var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false,
        rename: {
            'browser-sync' : 'bsync'
        }
    }),
    productionPath = './build/app/';
    tmpPath = '.tmp/';

$.gulp.task('build', ['jade'], function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er;
    });
    $.gulp.src(['./_dev/_server/.htaccess', './.tmp/index.html'])
        .pipe(assets).on('error', log)
        .pipe($.if('*.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(function (file) {
            var path;
            if (file.base.indexOf('/_jade/_layouts') !== -1) {
                path = file.base.substr((file.cwd + '/_dev/_jade/_layouts').length + 1);
            }
            else {
                path = file.base.substr((file.cwd + '/_dev').length + 1);
            }
            console.log(path);
            return path;
        }, {cwd: productionPath})).on('error', log);
});

$.gulp.task('css_img', function () {
   $.gulp.src(['./_dev/_sass/img/*'])
       .pipe($.gulp.dest(function (file) {
           return file.base.substr((file.cwd + '/_dev').length + 1);
       }, {cwd: productionPath})).on('error', log);
});

$.gulp.task('sass', function () {
    $.gulp.src(['./_dev/_sass/*.scss'])
        .pipe($.compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_sass')).on('error', log);
});


$.gulp.task('jade', ['wiredep'], function () {
  return $.gulp.src('./_dev/_jade/_layouts/index.jade')
    .pipe($.jade({
      pretty: true
    })).on('error', log)
    .pipe($.gulp.dest('./build/app/'));
});


$.gulp.task('browser-sync', ['watch'], function () {
  $.bsync({
    // server: {
    //   baseDir: productionPath
    // },
    proxy: "localhost:8000"
  });
});


$.gulp.task('watch', ['build'], function () {

    $.gulp.watch('./_dev/_jade/**/*.jade', ['jade']   );
    $.gulp.watch('bower.json',             ['wiredep']);
    // $.gulp.watch('./_server/**/*.php', ['build']);

    // Перезагрузка браузера на любое изменение в конечной директории
    // Немного избыточно, т.к. перезагружает браузер на каждый чих в productionPath
    // Зато работает
    $.gulp.watch(productionPath + '/**/*', $.bsync.reload);

    // $.gulp.watch('./_dev/**/*', ['jade', 'sass', 'css_img', 'build']);
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

$.gulp.task('wiredep', function() {
    $.wiredep.stream({
        directory: '_dev/_bower',
    })
    .pipe($.gulp.dest('_dev/_jade/'));
});
