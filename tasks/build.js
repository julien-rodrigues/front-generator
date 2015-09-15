import {argv} from 'yargs';
import gulp from 'gulp';


if (argv.prod) {
  /**
   * Build, production task.
   */
  gulp.task('build', [
    'clean:pre-build', 'copy:stage', 'styles:prod',
    'scripts:prod', 'clean:stage', 'copy:build'
  ], () => {
    gulp.start('clean:build');
  });
} else {
  /**
   * Build, development task.
   */
  gulp.task('build', [
    'clean:pre-build', 'copy:stage', 'styles:dev',
    'scripts:dev', 'clean:stage', 'copy:build'
  ], () => {
    gulp.start('clean:build');
  });
}
