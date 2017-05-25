'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const browserify = require('browserify');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const vinylSource = require('vinyl-source-stream');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');
const child = require('child_process');
// const fs = require('fs');

gulp.task('default', ['server', 'js', 'css', 'watch']);

gulp.task('server', function() {
  var server = child.spawn('node', ['server.js']);
  // var log = fs.createWriteStream('server.log', {flags: 'a'});
  // server.stdout.pipe(log);
  // server.stderr.pipe(log);
});

gulp.task('css', function() {
  return gulp.src('./assets/css/app.scss')
  .pipe(plumber({
    errorHandler:notify.onError('SASS error: <%= error.message %>')
  }))
  .pipe(sourceMaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 10 versions']
  }))
  .pipe(rename('combined.css'))
  .pipe(sourceMaps.write())
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return browserify('./assets/js/bootstrap.js', {debug:true})
    .bundle().on('error', function errorHandler(error) {
      var args = Array.prototype.slice.call(arguments);
      notify.onError('Browserify error: <%= error.message %>').apply(
        this, args);
      this.emit('end');
    })
    .pipe(vinylSource('combined.js'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    proxy: 'localhost:8880',
    port: 3001,
    open: false,
    notify: false
  });


  gulp.watch([
    './views/**/*.jade'
    ], browserSync.reload);

  gulp.watch([
    './assets/css/**/*.scss'
    ], ['css']);

  gulp.watch([
    './assets/js/**/*.js'
    ], ['js']);
});