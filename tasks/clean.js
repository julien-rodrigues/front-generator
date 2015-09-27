import config from './config';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

let cleanStageDeps = ['scripts', 'styles'];
let cleanStagePatterns = [
  `${config.paths.stage}/**/*.scss`,
  `${config.paths.stage}/**/*.js`,
  config.paths.stage + config.paths.sprite
];

// If we launched a production build.
if ($.util.env.prod) {
  cleanStageDeps.push('compress-images', 'cache-buster');
  cleanStagePatterns
    .push(`!${config.paths.stage}${config.scripts.entryPoint.substr(0, config.scripts.entryPoint.lastIndexOf('.'))}*.js`);
} else {
  cleanStagePatterns.push(`!${config.paths.stage}${config.scripts.entryPoint}`);
}


/**
 * Clean build task.
 */
gulp.task('clean:pre-build', ['scss-lint', 'eslint', 'create-sprite'], done =>
  del([config.paths.dist, config.paths.stage], done));


/**
 * Clean stage task.
 */
gulp.task('clean:stage', cleanStageDeps, done => del(cleanStagePatterns, done));


/**
 * Remove stage task.
 */
gulp.task('clean:build', ['copy:build'], done => del([config.paths.stage], done));
