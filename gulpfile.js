var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');


gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('build', function(callback) {
  runSequence('sass', callback);
});
