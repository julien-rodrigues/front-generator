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
 * @param {stream} stream - Current stream (optional)
 * @returns {object} The error (can be null)
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
 * @param {object} file - Current file in stream
 * @returns {stream} The file stream
 */
let scssCustomReporter = function(file) {
  if (!scssLintFailed && !file.scsslint.success) {
    scssLintFailed = true;
  }

  $.scssLint.defaultReporter(file);

  return file;
};


/**
 * SCSS lint on "end" event callback.
 * @method scssEndMessage
 * @returns {object} The error (can be null)
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
  let glob = globby.sync([`${config.paths.source}/**/*.js`]);

  if (eslint.execute(glob.join(' '))) {
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
  return gulp.src([
    `${config.paths.source}/**/*.scss`,
    `!${config.paths.source}${config.images.mappingFile}`
  ])
    .pipe($.scssLint({
      config: config.styles.linter.config,
      customReport: scssCustomReporter
    }))
    .on('end', scssEndMessage);
});
