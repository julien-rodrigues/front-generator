import {reload as bSReload} from 'browser-sync';
import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


/**
 * Bundles all styles.
 * @method stylesBundle
 * @param {object} source - Source folder
 * @param {string} destination - Compiled destination
 * @returns {object} The stream
 */
let stylesBundle = function(source, destination) {
  return gulp.src(source + config.styles.entryPoint)
    .pipe($.if((!$.util.env.prod && $.util.env.watch), $.plumber()))
    .pipe($.if(!$.util.env.prod, $.sourcemaps.init()))
    .pipe(
      $.sass.sync({
        includePaths: ['.'],
        precision: 10,
        outputStyle: ($.util.env.prod ? 'compressed' : 'expanded')
      }).on('error', $.util.log)
    )
    .pipe($.autoprefixer({
      browsers: [config.styles.autoprefixer]
    }))
    .pipe($.if(!$.util.env.prod, $.sourcemaps.write()))
    .pipe(gulp.dest(destination))
    .pipe($.if($.util.env.watching, bSReload({stream: true})))
    .pipe($.if(!$.util.env.prod, $.size({title: 'Development styles size'})))
    .pipe($.if($.util.env.prod, $.size({title: 'Production styles size'})))
    .on('error', $.util.log);
};


/**
 * Styles task.
 */
gulp.task('styles', ['copy:stage'], () => {
  return stylesBundle(config.paths.stage, config.paths.stage);
});


/**
 * Watch task.
 */
gulp.task('watch:styles', ['serve'], () => {
  gulp.watch(`${config.paths.source}/**/*.scss`, () => {
    gulp.start('scss-lint', () => {
      return stylesBundle(config.paths.source, config.paths.dist);
    });
  });
});
