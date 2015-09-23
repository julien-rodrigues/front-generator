import config from './config';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

let cleanStageDeps = ['scripts', 'styles'];
let cleanStagePatterns = [
  `${config.paths.stage}/**/*.scss`,
  `${config.paths.stage}/**/*.js`
];

// If we launched a production build.
if ($.util.env.prod) {
  cleanStageDeps.push('images', 'cache-buster');
  cleanStagePatterns.push(`!${config.paths.stage}${config.scripts.entryPoint.split('.')[0]}*-*.js`);
} else {
  cleanStagePatterns.push(`!${config.paths.stage}${config.scripts.entryPoint}`);
}


/**
 * Clean build task.
 */
gulp.task('clean:pre-build', ['scss-lint', 'eslint'], done => del([
  config.paths.dist, config.paths.stage
], done));


/**
 * Clean stage task.
 */
gulp.task('clean:stage', cleanStageDeps, done => del(cleanStagePatterns, done));


/**
 * Remove stage task.
 */
gulp.task('clean:build', done => del([config.paths.stage], done));
