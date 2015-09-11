'use strict';

import config from './tasks/config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import wrench from 'wrench';

/**
 * Import tasks.
 */
wrench.readdirSyncRecursive(config.paths.tasks).filter(
  file => (/\.(js)$/i).test(file)
).map(
  file => require(config.paths.tasks + file)
);


/**
 * Set default task.
 */
gulp.task('default', ['build:dev']);
