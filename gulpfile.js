var gulp = require('gulp');
var g = require('gulp-load-plugins')();

var	runSequence  = require('run-sequence'),
		browserSync = require('browser-sync'),
		clean = require('del');

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: './public'
		},
		online: false,
		notify: false
	});
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('jade', function(){
	gulp.src(['src/jade/index.jade'])
		.pipe(g.data(function(){
			return require('./src/jade/datas.json');
		}))
		.pipe(g.jade({pretty:true}))
		.pipe(gulp.dest('public/'))
		.pipe(browserSync.reload({stream:true}));
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
	return gulp.src(['src/scripts/jquery.js', 'src/scripts/unveil2.js', 'src/scripts/main.js'])
		.pipe(g.plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(g.concat('main.js'))
		.pipe(g.rename({suffix: '.min'}))
		.pipe(g.uglify())
		.pipe(gulp.dest('public/assets/js/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function(){
	return gulp.src('src/images/**/*')
		.pipe(g.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			optimizationLevel: 4,
			multipass: true,
			interlaced: true
		}))
		.pipe(gulp.dest('public/assets/images'));
});

gulp.task('copy', function(){
	gulp.src('src/fonts/*')
		.pipe(gulp.dest('public/assets/fonts'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('clean', function() {
    clean(['public/**/*', '!public']);
});

gulp.task('build', function() {
	runSequence(['styles', 'scripts', 'copy', 'images', 'jade']);
});

gulp.task('watch', function(){
	gulp.watch('src/less/**/*.less', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/images/**/*', ['images']);
	gulp.watch('src/jade/**/*.jade', ['jade']);
	gulp.watch('src/jade/*.json', ['jade']);
});

gulp.task('default', ['build', 'watch', 'serve'], function(){

});
