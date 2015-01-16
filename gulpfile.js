var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false
    }),
    productionPath = './app/';
    tmpPath = '.tmp/';

$.gulp.task('build', function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er;
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
        .pipe($.if('*.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(function (file) {
            var path;
            if (file.base.indexOf('_server') !== -1) {
                path = file.base.substr((file.cwd + '/_dev/_server').length + 1);
            }
            else {
                path = file.base.substr((file.cwd + '/_dev').length + 1);
            }
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


//
// Автоматически контролируем зависимости библиотек в index.jade
// в секциях bower:*
//
$.gulp.task('wiredep', function() {
    $.gulp.src('_dev/_jade/_layouts/index.jade')
        .pipe($.wiredep.stream({
            directory: '_dev/_bower',
        }))
        .pipe($.gulp.dest('_dev/_jade/_layouts/'));
});

//
// Собираем jade в app/index.html
//
$.gulp.task('jade', ['wiredep'], function () {
  return $.gulp.src('./_dev/_jade/_layouts/index.jade')
    .pipe($.jade({
      pretty: true
    })).on('error', log)
    .pipe($.gulp.dest(productionPath));
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
// Собираем js/combined.js из секции build:js
//
$.gulp.task('js', ['jade'], function() {
    var assets = $.useref.assets();

    $.gulp.src('./app/index.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify())).on('error', log)
    .pipe(assets.restore())
    .pipe($.gulp.dest('./app/'));
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


$.gulp.task('watch', ['build'], function () {

    $.gulp.watch('./_dev/_jade/**/*.jade', ['jade']   );
    $.gulp.watch('./_dev/_js/**/*.js',     ['js']     );
    $.gulp.watch('bower.json',             ['wiredep']);
    // $.gulp.watch('./_server/**/*.php', ['build']);

    // Перезагрузка браузера на любое изменение в конечной директории
    // Немного избыточно, т.к. перезагружает браузер на каждый чих в productionPath
    // Зато работает
    $.gulp.watch(productionPath + '/**/*', $.browserSync.reload);

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

