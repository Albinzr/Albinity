const gulp = require("gulp");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const livereload = require("gulp-livereload");
const stylus = require("gulp-stylus");
const cache = require("gulp-cache");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");

gulp.task("es6", () => {
	return gulp
		.src("./scripts/js/**/*")
		.pipe(plumber())
		.pipe(
			babel({
				presets: ["es2015"]
			})
		)
		.pipe(gulp.dest("./public/js/"));
});

gulp.task("img", function() {
	return gulp
		.src("./scripts/img/**/*")
		.pipe(plumber())
		.pipe(
			cache(
				imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
			)
		)
		.pipe(gulp.dest("./public/img"));
});

gulp.task("css", function() {
	return gulp
		.src("./scripts/css/main.styl")
		.pipe(plumber())
		.pipe(
			stylus(
				{
					// compress: true
					// concat: true
				}
			)
		)
		.pipe(concat("main.css"))
		.pipe(gulp.dest("./public/css"));
});

gulp.task("watch", function() {
	// Watch .scss files
	gulp.watch("./scripts/css/**/*.styl", ["css"]);

	// Watch .js files
	gulp.watch("./scripts/js/**/*.js", ["es6"]);

	// Watch image files
	gulp.watch("./scripts/img/**/*", ["img"]);

	// Create LiveReload server
	livereload.listen();
});

gulp.task("default", ["css", "es6", "img", "watch"]);
