import {reload as bSReload} from 'browser-sync';
import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

// Watch task.
if (!$.util.env.prod && $.util.env.watch) {
  gulp.watch(config.paths.source + config.html.entryPoint, changed => {
    return gulp.src(changed.path)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(bSReload({stream: true}))
      .pipe($.size({title: 'Development HTML size'}))
      .on('error', $.util.log);
  });
}


/**
 * HTML task.
 */
gulp.task('html', ['copy:stage'], () => {
  return gulp.src(config.paths.stage + config.html.entryPoint)
    .pipe($.minifyHtml(config.html.minifier))
    .pipe(gulp.dest(config.paths.stage))
    .pipe($.size({title: 'Production HTML size'}))
    .on('error', $.util.log);
});
