var gulp = require('gulp');
var g = require('gulp-load-plugins')();

var	runSequence  = require('run-sequence'),
		browserSync = require('browser-sync');

gulp.task('serve', function() {
  browserSync({
    server: {
       baseDir: "./dist"
    },
    online: false
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('jade', function(){
  gulp.src(['src/jade/index.jade'])
    .pipe(g.jade({pretty:true}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('styles', function(){
  gulp.src(['src/less/main.less'])
    .pipe(g.plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(g.less())
    .pipe(g.autoprefixer('last 2 versions'))
    .pipe(g.rename({suffix: '.min'}))
    .pipe(g.cssnano())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(g.plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(g.rename({suffix: '.min'}))
    .pipe(g.uglify())
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('clear-cache', function (done) {
  return g.cache.clearAll(done);
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(g.cache(g.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/images/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function(){
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('build', function(cb) {
  runSequence(['clear-cache', 'styles', 'scripts', 'fonts', 'images', 'jade']);
});

gulp.task('watch', function(){
  gulp.watch("src/less/**/*.less", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("src/images/**/*", ['images']);
  gulp.watch("src/jade/**/*.jade", ['jade']);
});

gulp.task('default', ['build', 'watch', 'serve'], function(){

});