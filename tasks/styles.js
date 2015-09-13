import {argv} from 'yargs';
import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Bundle all styles.
 * @method stylesBundle
 * @param {object} source - Source folder.
 * @param {string} destination - Compiled destination.
 * @return {object} The stream.
 */
let stylesBundle = (source, destination) => {
  return gulp.src(`${source}/${config.styles.entryPoint}`)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
      }).on('error', $.util.log)
    )
    .pipe($.autoprefixer({
      browsers: [config.styles.autoprefixer]
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(destination))
    .pipe($.size({title: 'Development styles size'}))
    .on('error', $.util.log);
};


/**
 * Styles, development task.
 */
gulp.task('styles:dev', ['copy:stage'], () => {
  if (argv.watch) {
    gulp.watch(`${config.paths.source}/**/*.scss`, () => {
      return stylesBundle(config.paths.source, config.paths.dist);
    });
  }
  return stylesBundle(config.paths.stage, config.paths.stage);
});
