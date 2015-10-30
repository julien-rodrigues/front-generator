import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Copy fonts to stage task.
 */
gulp.task('fonts', ['copy:stage'], () => {
  return gulp.src(config.paths.fonts)
    .pipe(gulp.dest(`${config.paths.stage}assets/fonts/`))
    .pipe($.size({title: 'Fonts size'}))
    .on('error', $.util.log);
});
