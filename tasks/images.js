import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Image compression task.
 */
gulp.task('images', ['copy:stage'], () => {
  return gulp.src(`${config.paths.stage}${config.paths.images}**/*.*`)
    .pipe($.imagemin({
      interlaced: true,
      optimizationLevel: 3,
      progressive: true
    }))
    .pipe(gulp.dest(`${config.paths.stage}${config.paths.images}`))
    .pipe($.size({title: 'Production images size'}))
    .on('error', $.util.log);
});
