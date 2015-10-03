import {assign} from 'lodash';
import babelify from 'babelify';
import browserify from 'browserify';
import {reload as bSReload} from 'browser-sync';
import buffer from 'vinyl-buffer';
import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

const $ = gulpLoadPlugins();

let browserifyOpts = {
  entries: [config.paths.source + config.scripts.entryPoint],
  debug: !$.util.env.prod
};

let browserifyBundle = browserify(browserifyOpts)
  .transform(babelify);

let watchifyOpts = assign({}, watchify.args, browserifyOpts);

let watchBundle = watchify(browserify(watchifyOpts))
  .transform(babelify)
  .on('update', () => {
    gulp.start('eslint', () => {
      scriptsBundle(watchBundle, config.paths.dist);
    });
  })
  .on('log', $.util.log);


/**
 * Bundles all scripts.
 * @method scriptsBundle
 * @param {object} bundleType - Browserify builder
 * @param {string} destination - Bundle destination
 * @returns {object} The stream
 */
let scriptsBundle = function(bundleType, destination) {
  return bundleType
    .bundle()
    .pipe(source(config.scripts.entryPoint))
    .pipe(buffer())
    .pipe($.if($.util.env.prod, $.uglify()))
    .pipe(gulp.dest(destination))
    .pipe($.if($.util.env.watching, bSReload({stream: true})))
    .pipe($.if(!$.util.env.prod, $.size({title: 'Development scripts size'})))
    .pipe($.if($.util.env.prod, $.size({title: 'Production scripts size'})))
    .on('error', $.util.log);
};


/**
 * Scripts task.
 */
gulp.task('scripts', ['copy:stage'], () => {
  return scriptsBundle(
    (!$.util.env.prod && $.util.env.watch ? watchBundle : browserifyBundle),
    config.paths.stage
  );
});
