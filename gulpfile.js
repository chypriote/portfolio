var gulp = require('gulp');

var	plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed');
		less = require('gulp-less');
		autoprefixer = require('gulp-autoprefixer');
		minifycss = require('gulp-minify-css');
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    jade = require('gulp-jade'),
    data = require('gulp-data'),
    runSequence  = require('run-sequence'),
		browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('jade', function(){
  gulp.src(['src/jade/index.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles', function(){
  gulp.src(['src/less/main.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('clear-cache', function (done) {
  return cache.clearAll(done);
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/images/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function(){
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('build', function(cb) {
  runSequence(['styles', 'scripts', 'images', 'jade']);
});

gulp.task('watch', function(){
  gulp.watch("src/less/**/*.less", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("src/images/**/*", ['images']);
  gulp.watch("src/jade/**/*.jade", ['jade']);
});

gulp.task('default', ['build', 'watch', 'browser-sync'], function(){

});