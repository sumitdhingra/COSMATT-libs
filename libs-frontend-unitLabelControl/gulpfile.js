var gulp = require('gulp'),
  gp_concat = require('gulp-concat'),
  gp_rename = require('gulp-rename'),
  gp_uglify = require('gulp-uglify'),
  gp_clean = require('gulp-clean'),
  minifyCSS = require('gulp-minify-css'),
  less = require('gulp-less'),
  path = require('path'),
  watch = require("gulp-watch");

var combineFiles = {
  css: [
    './src/css/**/*.css'
  ],
  js: [
    './src/js/unitData.js',
    './src/js/unitConverter.js',
    './src/js/unitLabelControl.js'
  ],
  less: [
    './src/css/**/*.less'
  ]
};

gulp.task('scripts', function() {
  return gulp.src(combineFiles.js)
    .pipe(gp_concat('unitLabelControl.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gp_rename('unitLabelControl.min.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  return gulp.src(combineFiles.css)
    .pipe(gp_concat('unitLabelControl.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(gp_concat('unitLabelControl.min.css'))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('clean', function() {
  return gulp.src('./dist/', { read: false })
    .pipe(gp_clean());
});
gulp.task('lesstocss', function() {
  return gulp.src(combineFiles.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('watcher', function() {
  gulp.watch('./src/css/*.less', ['css']);
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
});

gulp.task('dist', ['css', 'scripts']);

gulp.task('dev-dist', ['css', 'scripts', 'watcher']);

gulp.task('default', ['clean'], function() {
  gulp.start('dist');
});






gulp.task('copy', function() {
  return gulp.src(['dist/**/*'])
    .pipe(gulp.dest('../../lib-engine-cosmattmp/src/libs/libs-frontend-unitLabelControl/dist/'));
});

gulp.task('clean-dest', function() {
  return gulp.src(['../../lib-engine-cosmattmp/src/libs/libs-frontend-unitLabelControl/dist/'])
    .pipe(gp_clean({ force: true }));
});