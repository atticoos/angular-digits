var gulp = require('gulp'),
    concat = require('gulp-concat'),
    karma = require('karma').server;

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('build', function () {
  gulp.src([
    'src/digits.js',
    'src/provider.js',
    'src/digits-response.js',
    'src/digits-response-error.js'
  ])
  .pipe(concat('angular-digits.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);
gulp.task('watch', function () {
  gulp.watch('src/*.js', ['build']);
})
