// Live reload chrome package
//https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');
var minify = require('gulp-minifier');

gulp.task('sass', function () {
	return gulp.src('./assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(livereload());
});

gulp.task('sass:watch', function () {
	livereload.listen();
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('minify', function() {
	return gulp.src('./assets/js/**/*.js').pipe(minify({
	  minify: true,
	  minifyJS: {
		sourceMap: false
	  },
	  minifyCSS: false,
	  getKeptComment: function (content, filePath) {
		  var m = content.match(/\/\*![\s\S]*?\*\//img);
		  return m && m.join('\n') + '\n' || '';
	  }
	})).pipe(gulp.dest('./dist/js/'));
	
});

gulp.task('minify:watch', function () {
	livereload.listen();
	gulp.watch('./dist/js/**/*.js', ['scripts']);
});

gulp.task('scripts', function () {
	return gulp.src([
		'./dist/js/scripts.js',
	])
		.pipe(plumber())
		.pipe(concat('mainscripts.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(livereload());
});

gulp.task('scripts:watch', function () {
	livereload.listen();
	gulp.watch('./assets/js/**/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'sass:watch', 'scripts', 'scripts:watch', 'minify', 'minify:watch']);