import appPackage from '../package.json';
import browserSync from 'browser-sync';
import config from './config';
import gulp from 'gulp';


/**
 * Serve task.
 */
gulp.task('serve', ['clean:build'], () => {
  browserSync({
    logPrefix: appPackage.name,
    reloadOnRestart: true,
    server: config.paths.dist
  });
});
