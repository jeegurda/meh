var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var notifier = require('node-notifier');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var minifyify = require('minifyify');

var inputName = 'index.jsx';
var outputName = 'index.js';
var minify = true;

gulp.task('reload-page', function() {
	livereload.reload();
});

var customOpts = {
	entries: ['./src/js/' + inputName],
	// debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b;


var bundler = function() {
	return b.bundle()
		.on('error', function(err) {
			notifier.notify({
				title: 'Gulp browserify',
				message: err.toString()
			});
			console.log(err.toString())
		})
		.pipe(source(outputName))
		.pipe(gulp.dest('./dist/static/js/'))
		.pipe(livereload());
};

gulp.task('build-jsx', function() {
	b.on('log', function(msg) {
		console.log(outputName + ' builded. ' + msg);
	});
	return bundler();
});


gulp.task('build-and-reload-sass', function() {
	gulp.src('./src/css/**/*.sass')
		.pipe(sass())
		.on('error', function(err) {
			notifier.notify({
				title: 'Gulp sass',
				message: err.formatted
			});
			console.log('Sass error in ' + err.file + '\n' + err.formatted);
		})
		.pipe(gulp.dest('./dist/static/css/'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();

	// watch for src
	gulp.watch('./src/css/**/*.sass', ['build-and-reload-sass']);
	// gulp.watch('src/js/*.{js,jsx}', ['build-and-reload-js']);

	b = watchify(browserify(opts)).transform(babelify, {
		presets: ['react']
	});
	if (minify) {
		b.plugin('minifyify', {map: false});
	}
	gulp.start('build-jsx');
	b.on('update', function(files) {
		console.log(files.toString() + ' updated, rebundling...');
		bundler();
	});

	// watch for files put directly in /dist
	gulp.watch('./dist/*.html', ['reload-page']);
	gulp.watch('./dist/static/images/**/*.{png,jpg,jpeg}', ['reload-page']);
});

gulp.task('build', function() {
	b = browserify(opts).transform(babelify, {
		presets: ['react']
	});
	if (minify) {
		b.plugin('minifyify', {map: false});
	}

	gulp.start('build-and-reload-sass', 'build-jsx');
});