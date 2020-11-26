
var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_clean = require('gulp-clean'),
    minifyCSS = require('gulp-minify-css'),
    insert = require('gulp-insert'),
    webpack = require('webpack-stream');
    babel = require('gulp-babel');
    less = require('gulp-less');
    path = require('path');
    watch = require("gulp-watch");

var combineFiles = {    
    css:[
        './src/js/jquery.spinner/dist/css/bootstrap-spinner.min.css',
        './src/css/**/*.css'
    ],
    js:[             
        './src/js/jquery.spinner/dist/js/jquery.spinner.js',
        './src/js/libs-frontend-TSCurve.js'  
    ],
    less:[
        './src/css/**/*.less'
    ]
};

gulp.task('scripts', function(){
    return gulp.src(combineFiles.js)
        .pipe(gp_concat('tsCurve.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gp_rename('tsCurve.min.js'))
        .pipe(babel({
            presets: ['es2015']
         }))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', ['lesstocss'], function(){
     return gulp.src(combineFiles.css)
        .pipe(minifyCSS())
        .pipe(gp_concat('tsCurve.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', function () {
    return gulp.src('./dist/', {read: false})
        .pipe(gp_clean());
});

gulp.task('lesstocss', function () {
  return gulp.src(combineFiles.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./src/css'))
});

gulp.task('watcher', function () {
  gulp.watch('./src/css/*.less', ['lesstocss', 'css']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
});

gulp.task('dist',['lesstocss', 'css', 'scripts']);

gulp.task('dev-dist',['lesstocss', 'css', 'scripts', 'watcher']);

gulp.task('default', ['clean'], function(){
    gulp.start('dist');
});