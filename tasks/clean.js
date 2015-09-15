import config from './config';
import del from 'del';
import gulp from 'gulp';


/**
 * Clean build task.
 */
gulp.task('clean:build', cb => del([
  config.paths.dist, config.paths.stage
], cb));


/**
 * Clean stage task.
 */
gulp.task('clean:dev-stage', ['scripts:dev', 'styles:dev'], cb => {
  return del([
    `${config.paths.stage}/**/*.scss`,
    `${config.paths.stage}/**/*.js`,
    `!${config.paths.stage}/${config.scripts.entryPoint}`
  ], cb);
});


/**
 * Remove stage task.
 */
gulp.task('clean:stage', cb => {
  return del([config.paths.stage], cb);
});