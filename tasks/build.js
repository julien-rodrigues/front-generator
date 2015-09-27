import config from '../config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

let buildTasks = [
  'eslint', 'create-sprite', 'clean:pre-build', 'copy:stage',
  'styles', 'scripts', 'clean:stage', 'copy:build', 'clean:build'
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
  buildTasks.push('html', 'compress-images', 'cache-buster');
}


/**
 * Build task.
 */
gulp.task('build', buildTasks, () => {
  if (!$.util.env.prod && $.util.env.watch) {
    $.util.env.watching = true;
    $.util.log($.util.colors.green('** Watching files for changes **'));
    gulp.start('serve');
  } else {
    $.util.log($.util.colors.green(
      `** Your build is ready in ${config.paths.dist} **`));

    if (!$.util.env.prod) {
      gulp.start('serve');
    }
  }
});
