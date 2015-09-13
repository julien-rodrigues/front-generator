import {assign} from 'lodash';
import {argv} from 'yargs';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

const $ = gulpLoadPlugins();

let browserifyOpts = {
  entries: [`${config.paths.source}/${config.scripts.entryPoint}`],
  debug: true
};

let browserifyBundle = browserify(browserifyOpts)
  .transform(babelify);

let watchifyOpts = assign({}, watchify.args, browserifyOpts);

let watchBundle = watchify(browserify(watchifyOpts))
  .transform(babelify)
  .on('update', () => {
    scriptsBundle(watchBundle, config.paths.dist);
  })
  .on('log', $.util.log);


/**
 * Bundle all scripts.
 * @method scriptsBundle
 * @param {object} bundleType - Browserify builder.
 * @param {string} destination - Bundle destination.
 * @return {object} The stream.
 */
let scriptsBundle = (bundleType, destination) => {
  return bundleType
    .bundle()
    .pipe(source(config.scripts.entryPoint))
    .pipe(buffer())
    .pipe(gulp.dest(destination))
    .pipe($.size({title: 'Development scripts size'}))
    .on('error', $.util.log);
};


/**
 * Scripts, development task.
 */
gulp.task('scripts:dev', ['copy:stage'], () => {
  return scriptsBundle(
    (argv.watch ? watchBundle : browserifyBundle),
    config.paths.stage
  );
});
