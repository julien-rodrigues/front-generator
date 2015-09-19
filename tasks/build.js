import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Build task.
 */
if (('build' === $.util.env._[0]) && (!$.util.env.watch && !$.util.env.prod)) {
  $.util.log($.util.colors.yellow(`

    ******************************************************
    ** No options specified. Making a development build **
    ******************************************************
  `));
}

gulp.task('build', [
  'eslint', 'clean:pre-build', 'copy:stage', 'styles',
  'scripts', 'clean:stage', 'copy:build'
], () => {
  gulp.start('clean:build', () => {
    if (!$.util.env.prod && $.util.env.watch) {
      $.util.env.watching = true;
      $.util.log($.util.colors.green('** Watching files for changes **'));
    } else {
      $.util.log($.util.colors.green(
        `** Your build is ready in ${config.paths.dist} **`));
    }
  });
});
