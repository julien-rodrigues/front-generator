
import browserSync from 'browser-sync';
import config from '../config';
import gulp from 'gulp';


/**
 * Serve task.
 */
gulp.task('serve', () => {
  browserSync({
    logPrefix: 'front-generator',
    reloadOnRestart: true,
    server: config.paths.dist
  });
});
