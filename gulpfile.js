var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var optimizejs = require('gulp-optimize-js');
var watch = require('gulp-watch');

gulp.task('watch', function () {
  // watch many files
  watch([
    'background.html', 'manifest.json', 'popup.html', 'start.html',
    'static/*.js', 'static/*.css'
  ], function () {
    gulp.start('default');
  });
});

gulp.task('pack-js', function () {
  gulp.src(['static/jquery.js', 'static/garlic.js', 'static/tippy.min.js', 'static/moment.min.js', 'static/template-web.js', 'static/popup.js'])
    .pipe(concat('bundle.js'))
    .pipe(minify())
    .pipe(optimizejs())
    .pipe(gulp.dest('build/static/js'));
  console.log("pack-js task done @", new Date())
    
});

gulp.task('pack-css', function () {
  return gulp.src(['static/style/weui.min.css', 'static/style/popup.css', 'static/style/tippy.css'])
    .pipe(concat('popupstyle.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('build/static/style'));
});

gulp.task('move-static', [], function () {
  gulp.src([
    'static/audio/*.*', 'static/image/*.*', 'static/style/*.css',
    'static/background.js', 'static/content_script.js', 'static/jquery.js',
    'static/lodash.js', 'static/start.js', 'static/zepto.min.js', 'static/moment.min.js',
  ], { base: './' })
    .pipe(gulp.dest('build'));
});

gulp.task('move-file', [], function () {
  gulp.src([
    'background.html', 'manifest.json', 'popup.html', 'start.html'
  ])
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['move-static', 'move-file', 'pack-js', 'pack-css']);