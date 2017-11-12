var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

    var paths = {
        styles: {
            src: 'src/styles/**/*.scss',
            dest: 'dist/css/'
        },
        scripts: {
            src: 'src/scripts/**/*.js',
            dest: 'dist/js/'
        }
    };

    function styles() {
        return gulp.src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(sourcemaps.write())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream());
    }

    function scripts() {
        return gulp.src(paths.scripts.src)
            .pipe(uglify())
            .pipe(concat('main.min.js'))
            .pipe(gulp.dest(paths.scripts.dest))
    }

    function clean() {
        return del('dist/css', 'dist/js');
    }

    function watch() {
        gulp.watch(paths.scripts.src, scripts);
        gulp.watch(paths.styles.src, styles);
        gulp.watch('dist/*.html', browserSync.reload);
    }

    function serve() {
        browserSync.init({
            server: {
                baseDir: './dist'
            }
        });
        browserSync.watch(['./dist/*.html', './dist/**/*.*'], browserSync.reload);
    }


    exports.styles = styles;
    exports.scripts = scripts;
    exports.clean = clean;
    exports.watch = watch;

    gulp.task('build', gulp.series(
        clean,
        gulp.parallel(styles, scripts)
    ));

    gulp.task('default', gulp.series(
        clean,
        gulp.parallel(styles, scripts),
        gulp.parallel(watch, serve)
    ));