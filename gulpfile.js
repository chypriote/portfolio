var gulp = require('gulp');
var g = require('gulp-load-plugins')();

var	runSequence  = require('run-sequence'),
		browserSync = require('browser-sync');

gulp.task('serve', function() {
	browserSync({
		server: {
			 baseDir: "./public"
		},
		online: false
	});
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('jade', function(){
	gulp.src(['src/jade/index.jade'])
		.pipe(g.data(function(file){
			return require('./src/jade/datas.json')
		}))
		.pipe(g.jade({pretty:true}))
		.pipe(gulp.dest('public/'))
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
		.pipe(gulp.dest('public/assets/css/'))
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
		.pipe(gulp.dest('public/assets/js/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('clear-cache', function (done) {
	return g.cache.clearAll(done);
});

gulp.task('images', function(){
	gulp.src('src/images/**/*')
		// .pipe(g.plumber({
		//   errorHandler: function (error) {
		//     console.log(error.message);
		//     this.emit('end');
		// }}))
		// .pipe(g.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		// .pipe(gulp.dest('public/assets/images'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('copy', function(){
	gulp.src('src/fonts/*')
		.pipe(gulp.dest('public/assets/fonts'));
	gulp.src('src/flags/*')
		.pipe(gulp.dest('public/assets/flags'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('build', function(cb) {
	runSequence(['clear-cache', 'styles', 'scripts', 'copy', 'images', 'jade']);
});

gulp.task('watch', function(){
	gulp.watch("src/less/**/*.less", ['styles']);
	gulp.watch("src/scripts/**/*.js", ['scripts']);
	gulp.watch("src/images/**/*", ['images']);
	gulp.watch("src/jade/**/*.jade", ['jade']);
});

gulp.task('default', ['build', 'watch', 'serve'], function(){

});