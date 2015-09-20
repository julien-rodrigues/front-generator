import eslint from 'eslint/lib/cli';
import globby from 'globby';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

let displayError = function() {
  let error = null;

  if (!$.util.env.watching) {
    if ($.util.env.prod) {
      $.util.log($.util.colors.red(`

        **************************************************
        ** YOU SHALL NOT PASS! FOLLOW THE RULES PLEASE! **
        **************************************************
      `));

      error = new $.util.PluginError(
        'eslint',
        new Error($.util.colors.red(
          "** Fix this or you won't be able to build the app **"))
      );
    } else {
      $.util.log($.util.colors.red(`

        ***************************************************************
        ** FIX THIS OR YOU WON'T BE ABLE TO MAKE A PRODUCTION BUILD! **
        ***************************************************************
      `));
    }
  }

  return error;
};

/**
 * Lint JavaScript files task.
 */
gulp.task('eslint', done => {
  let linterMsg = null;

  if (eslint.execute(globby.sync(['src/**/*.js']).join(' '))) {
    linterMsg = displayError();
  } else {
    $.util.log($.util.colors.green(
      '** Great! Found no standard/style errors **'));
  }

  done(linterMsg);
});
