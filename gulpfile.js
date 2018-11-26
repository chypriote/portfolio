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
	return gulp.src(['src/jade/index.pug'])
		.pipe(g.data(function(){
			return require('./src/jade/strings/fr.json');
		}))
		.pipe(g.pug({pretty:true}))
		.pipe(gulp.dest('public/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('inter', function(){
	return gulp.src(['src/jade/index.pug'])
		.pipe(g.data(function(){
			return require('./src/jade/strings/en.json');
		}))
		.pipe(g.pug({pretty:true}))
		.pipe(gulp.dest('public/en/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('styles', function(){
	return gulp.src(['src/less/main.less'])
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
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function(){
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/unveil2/dist/jquery.unveil2.min.js',
			'src/scripts/main.js'
		])
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
	return gulp.src('src/fonts/*')
		.pipe(gulp.dest('public/assets/fonts'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('clean', function() {
    return clean(['public/**/*', '!public']);
});

gulp.task('build', gulp.parallel('styles', 'scripts', 'copy', 'images', 'jade', 'inter'));

gulp.task('watch', function(){
	gulp.watch('src/less/**/*.less', gulp.series('styles'));
	gulp.watch('src/scripts/**/*.js', gulp.series('scripts'));
	gulp.watch('src/images/**/*', gulp.series('images'));
	gulp.watch('src/jade/**/*.pug', gulp.series('jade', 'inter'));
	gulp.watch('src/jade/strings/**/*.json', gulp.series('jade', 'inter'));
});

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));
