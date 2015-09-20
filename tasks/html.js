import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * HTML task.
 */
gulp.task('html', ['copy:stage'], () => {
  return gulp.src(`${config.paths.stage}/index.html`)
    .pipe($.minifyHtml(config.html.minifier))
    .pipe(gulp.dest(config.paths.stage))
    .pipe($.size({title: 'Production HTML size'}))
    .on('error', $.util.log);
});
