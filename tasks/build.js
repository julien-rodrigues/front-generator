'use strict';

import gulp from 'gulp';


/**
 * Build, development task.
 */
gulp.task('build:dev', [
  'clean:build', 'copy:stage', 'styles:dev',
  'scripts:dev', 'clean:dev-stage', 'copy:dev'
], () => {
  gulp.start('clean:stage');
});
