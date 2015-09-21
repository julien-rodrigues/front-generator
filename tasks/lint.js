import config from './config';
import eslint from 'eslint/lib/cli';
import globby from 'globby';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

let scssLintFailed = false;


/**
 * Displays errors depending on the environment.
 * Can throw an error and stop the process.
 * @method errorWarning
 * @param {stream} stream - Current stream (optional).
 * @return {object} The error (can be null).
 */
let errorWarning = function(stream = null) {
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

      if (stream) {
        stream.emit('error', error);
      }
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
 * SCSS lint custom report.
 * @method scssCustomReporter
 * @param {object} file - Current file in stream.
 * @return {stream} The file stream.
 */
let scssCustomReporter = function(file) {
  if (!scssLintFailed) {
    scssLintFailed = true;
  }

  $.scssLint.defaultReporter(file);

  return file;
};


/**
 * SCSS lint on "end" event callback.
 * @method scssEndMessage
 * @return {object} The error (can be null).
 */
let scssEndMessage = function() {
  let linterMsg = null;

  if (scssLintFailed) {
    linterMsg = errorWarning(this);
  } else {
    $.util.log($.util.colors.green(
      '** Great! Found no standard/style errors in your SCSS **'));
  }

  return linterMsg;
};


/**
 * Lint JavaScript files task.
 */
gulp.task('eslint', done => {
  let linterMsg = null;

  if (eslint.execute(globby.sync([`${config.paths.source}/**/*.js`]).join(' '))) {
    linterMsg = errorWarning();
  } else {
    $.util.log($.util.colors.green(
      '** Great! Found no standard/style errors in your JavaScript **'));
  }

  done(linterMsg);
});


/**
 * Lint SCSS files task.
 */
gulp.task('scss-lint', () => {
  return gulp.src(`${config.paths.source}/**/*.scss`)
    .pipe($.scssLint({
      config: config.styles.linter.config,
      customReport: scssCustomReporter
    }))
    .on('end', scssEndMessage);
});
