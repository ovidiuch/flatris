var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    react = require('gulp-react'),
    less = require('gulp-less');

var paths = {
  scripts: [
    'src/flatris.js',
    'src/components/**/*.jsx'
  ],
  style: ['src/style/**/*.less']
};

gulp.task('build', function() {
  gulp.src(paths.scripts)
    .pipe(react())
    .pipe(concat('flatris.js'))
    .pipe(gulp.dest('build'))
    .pipe(uglify())
    .pipe(rename('flatris.min.js'))
    .pipe(gulp.dest('build'));

  gulp.src(paths.style)
    .pipe(less())
    .pipe(concat('flatris.css'))
    .pipe(gulp.dest('build'));
});

// Reactively generate a build whenever a source file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts.concat(paths.style), ['build']);
});

gulp.task('default', ['build', 'watch']);
