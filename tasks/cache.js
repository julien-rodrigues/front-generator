import config from './config';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import through from 'through2';

const $ = gulpLoadPlugins();


/**
 * Deletes original file after it has been busted.
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
 * Cache revision task.
 */
gulp.task('cache-revision', ['compress-images', 'scripts', 'styles'], () => {
  return gulp.src([
    config.paths.stage + config.scripts.entryPoint,
    `${config.paths.stage}${config.styles.entryPoint.substr(0, config.styles.entryPoint.lastIndexOf('.'))}*.css`,
    `${config.paths.stage}${config.paths.assets}**/*.*`
  ], {base: config.paths.stage})
    .pipe($.rev())
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
 * Cache busting task.
 */
gulp.task('cache-buster', ['cdn-prefix'], () => {
  return gulp.src([
    config.paths.stage + config.html.entryPoint,
    `${config.paths.stage}${config.styles.entryPoint.substr(0, config.styles.entryPoint.lastIndexOf('.'))}*.css`,
    `${config.paths.stage}${config.scripts.entryPoint.substr(0, config.scripts.entryPoint.lastIndexOf('.'))}*.js`
  ])
    .pipe($.revReplace({
      manifest: gulp.src(config.paths.stage + config.cache.manifest)
    }))
    .pipe(gulp.dest(config.paths.stage))
    .on('error', $.util.log);
});
