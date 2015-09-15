import gulp from 'gulp';


/**
 * Build task.
 */
gulp.task('build', [
  'clean:pre-build', 'copy:stage', 'styles',
  'scripts', 'clean:stage', 'copy:build'
], () => {
  gulp.start('clean:build');
});
