'use strict';

import babelify from 'babelify';
import browserify from 'browserify';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';

/**
 * Build configuration
 */
const $ = gulpLoadPlugins();
const AUTOPREFIXER_MIN = 'last 1 version';
const DIST_DIR = 'dist';
const SCRIPTS_ENTRY_POINT = 'client.js';
const SOURCE_DIR = 'src';
const STAGE_DIR = '.stage';
const STYLES_ENTRY_POINT = 'client.scss';
let bundle = browserify({
  entries: [SOURCE_DIR + '/' + SCRIPTS_ENTRY_POINT],
  debug: true
}).transform(babelify.configure({
  stage: 0
}));

/**
 * Clean task
 */
gulp.task('clean', del.bind(null, [DIST_DIR, STAGE_DIR]));

/**
 * Copy task
 */
gulp.task('copy', ['clean'], function() {
  return gulp.src(SOURCE_DIR + '/**/*.*')
    .pipe(gulp.dest(STAGE_DIR))
    .on('error', $.util.log);
});

/**
 * Styles task
 */
gulp.task('styles', ['copy'], function() {
  return gulp.src(STAGE_DIR + '/' + STYLES_ENTRY_POINT)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.util.log))
    .pipe($.autoprefixer({
      browsers: [AUTOPREFIXER_MIN]
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(STAGE_DIR));
});

/**
 * Scripts task
 */
gulp.task('scripts', ['copy'], function() {
  return bundle
    .bundle()
    .pipe(source(SCRIPTS_ENTRY_POINT))
    .pipe(gulp.dest(STAGE_DIR));
});

/**
 * Build task
 */
gulp.task('build', ['copy', 'styles', 'scripts']);

/**
 * Default task
 */
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
