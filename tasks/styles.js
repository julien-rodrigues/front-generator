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
    .pipe($.if(!$.util.env.prod, $.plumber()))
    .pipe($.if(!$.util.env.prod, $.sourcemaps.init()))
    .pipe(
      $.sass.sync({
        outputStyle: ($.util.env.prod ? 'compressed' : 'expanded'),
        precision: 10,
        includePaths: ['.']
      }).on('error', $.util.log)
    )
    .pipe($.autoprefixer({
      browsers: [config.styles.autoprefixer]
    }))
    .pipe($.if(!$.util.env.prod, $.sourcemaps.write()))
    .pipe(gulp.dest(destination))
    .pipe($.if(!$.util.env.prod, $.size({title: 'Development styles size'})))
    .pipe($.if($.util.env.prod, $.size({title: 'Production styles size'})))
    .on('error', $.util.log);
};


/**
 * Styles task.
 */
gulp.task('styles', ['copy:stage'], () => {
  if (!$.util.env.prod && $.util.env.watch) {
    gulp.watch(`${config.paths.source}/**/*.scss`, () => {
      return stylesBundle(config.paths.source, config.paths.dist);
    });
  }
  return stylesBundle(config.paths.stage, config.paths.stage);
});
