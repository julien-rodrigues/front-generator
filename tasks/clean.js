import {argv} from 'yargs';
import config from './config';
import del from 'del';
import gulp from 'gulp';

let cleanStageDeps = null;

if (argv.prod) {
  cleanStageDeps = ['scripts:prod', 'styles:prod'];
} else {
  cleanStageDeps = ['scripts:dev', 'styles:dev'];
}


/**
 * Clean build task.
 */
gulp.task('clean:pre-build', cb => del([
  config.paths.dist, config.paths.stage
], cb));


/**
 * Clean stage task.
 */
gulp.task('clean:stage', cleanStageDeps, cb => {
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
