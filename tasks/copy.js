import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Copy to stage task.
 */
gulp.task('copy:stage', ['clean:build'], () => {
  return gulp.src(`${config.paths.source}/**/*.*`)
    .pipe(gulp.dest(config.paths.stage))
    .pipe($.size({title: 'Pre-build size'}))
    .on('error', $.util.log);
});


/**
 * Copy to dist, development task.
 */
gulp.task('copy:dev', ['clean:dev-stage'], () => {
  return gulp.src(`${config.paths.stage}/**/*.*`)
    .pipe(gulp.dest(config.paths.dist))
    .pipe($.size({title: 'Development build size'}))
    .on('error', $.util.log);
});
