import config from './config';
import del from 'del';
import gulp from 'gulp';


/**
 * Clean build task.
 */
gulp.task('clean:pre-build', ['scss-lint', 'eslint'], done => del([
  config.paths.dist, config.paths.stage
], done));


/**
 * Clean stage task.
 */
gulp.task('clean:stage', ['scripts', 'styles'], done => del([
  `${config.paths.stage}/**/*.scss`,
  `${config.paths.stage}/**/*.js`,
  `!${config.paths.stage}/${config.scripts.entryPoint}`
], done));


/**
 * Remove stage task.
 */
gulp.task('clean:build', done => del([config.paths.stage], done));
