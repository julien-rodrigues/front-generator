import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Copy to stage task.
 */
gulp.task('copy:stage', ['clean:pre-build'], () => {
  return gulp.src(`${config.paths.source}/**/*.*`)
    .pipe(gulp.dest(config.paths.stage))
    .pipe($.size({title: 'Pre-build size'}))
    .on('error', $.util.log);
});


/**
 * Copy to dist task.
 */
gulp.task('copy:build', ['clean:stage'], () => {
  return gulp.src(`${config.paths.stage}/**/*.*`)
    .pipe(gulp.dest(config.paths.dist))
    .pipe($.if(!$.util.env.prod, $.size({title: 'Development build size'})))
    .pipe($.if($.util.env.prod, $.size({title: 'Production build size'})))
    .on('error', $.util.log);
});
