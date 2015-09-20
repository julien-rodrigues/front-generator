import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

let buildTasks = [
  'eslint', 'clean:pre-build', 'copy:stage',
  'styles', 'scripts', 'clean:stage', 'copy:build'
];

// If we launched the build task without arguments.
if (('build' === $.util.env._[0]) && (!$.util.env.watch && !$.util.env.prod)) {
  $.util.log($.util.colors.yellow(`

    ******************************************************
    ** No options specified. Making a development build **
    ******************************************************
  `));
}

// If we launched a production build.
if ($.util.env.prod) {
  buildTasks.push('html');
}

/**
 * Build task.
 */
gulp.task('build', buildTasks, () => {
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
