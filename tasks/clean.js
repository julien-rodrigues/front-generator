import config from './config';
import del from 'del';
import gulp from 'gulp';


/**
 * Clean build task.
 */
gulp.task('clean:pre-build', cb => del([
  config.paths.dist, config.paths.stage
], cb));


/**
 * Clean stage task.
 */
gulp.task('clean:stage', ['scripts', 'styles'], cb => {
  return del([
    `${config.paths.stage}/**/*.scss`,
    `${config.paths.stage}/**/*.js`,
    `!${config.paths.stage}/${config.scripts.entryPoint}`
  ], cb);
});


/**
 * Remove stage task.
 */
gulp.task('clean:build', cb => {
  return del([config.paths.stage], cb);
});
