import config from './config';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import through from 'through2';

const $ = gulpLoadPlugins();


/**
 * Delete original file after it has been busted.
 * @method deleteOriginalFile
 * @return {object} The stream.
 */
let deleteOriginalFile = function() {
  return through.obj(function(file, enc, done) {
    this.push(file);

    if (!file.revOrigPath) {
      return done();
    }

    del([file.revOrigPath], done());
  });
};


/**
 * Cache busting task.
 */
gulp.task('cache-buster', ['images', 'scripts', 'styles'], () => {
  return gulp.src([
    `${config.paths.stage}${config.scripts.entryPoint}`,
    `${config.paths.stage}${config.styles.entryPoint.split('.')[0]}*.css`,
    `${config.paths.stage}${config.paths.assets}**/*.*`
  ], {base: config.paths.stage}).pipe($.rev())
    .pipe(gulp.dest(config.paths.stage))
    .pipe(deleteOriginalFile())
    .pipe($.rev.manifest({
      merge: true,
      path: config.cache.manifest
    }))
    .pipe(gulp.dest(config.paths.stage))
    .on('error', $.util.log);
});


/**
 * Image compression task.
 */
gulp.task('images', ['copy:stage'], () => {
  return gulp.src(`${config.paths.stage}${config.paths.images}**/*.*`)
    .pipe($.imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3
    }))
    .pipe(gulp.dest(`${config.paths.stage}${config.paths.images}`))
    .pipe($.size({title: 'Production images size'}))
    .on('error', $.util.log);
});
