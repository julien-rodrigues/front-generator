import config from './config';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import normalizeUrl from 'normalize-url';
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
 * Prefix busted urls with CDN host.
 * @method cdnPrefix
 * @return {object} The stream.
 */
let cdnPrefix = function() {
  return through.obj(function(file, enc, done) {
    let manifest = JSON.parse(file.contents);
    let newManifest = null;

    if (config.cdn && config.cdn.host) {
      for (let i in manifest) {
        if (manifest.hasOwnProperty(i)) {
          manifest[i] = normalizeUrl(config.cdn.host + manifest[i], {
            normalizeProtocol: false
          });
        }
      }
    }

    newManifest = new $.util.File({
      base: file.base,
      contents: new Buffer(JSON.stringify(manifest, null, 2)),
      cwd: file.cwd,
      path: file.path
    });

    this.push(newManifest);
    done();
  });
};


/**
 * Cache revision task.
 */
gulp.task('cache-revision', ['images', 'scripts', 'styles'], () => {
  return gulp.src([
    `${config.paths.stage}${config.scripts.entryPoint}`,
    `${config.paths.stage}${config.styles.entryPoint.substr(0, config.styles.entryPoint.lastIndexOf('.'))}*.css`,
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
 * Cache busting task.
 */
gulp.task('cdn-prefix', ['cache-revision'], () => {
  return gulp.src(`${config.paths.stage}${config.cache.manifest}`)
    .pipe(cdnPrefix())
    .pipe(gulp.dest(config.paths.stage))
    .on('error', $.util.log);
});


/**
 * Cache busting task.
 */
gulp.task('cache-buster', ['cdn-prefix'], () => {
  return gulp.src([
    `${config.paths.stage}${config.html.entryPoint}`,
    `${config.paths.stage}${config.styles.entryPoint.substr(0, config.styles.entryPoint.lastIndexOf('.'))}*.css`,
    `${config.paths.stage}${config.scripts.entryPoint.substr(0, config.scripts.entryPoint.lastIndexOf('.'))}*.js`
  ]).pipe($.revReplace({manifest: gulp.src(`${config.paths.stage}${config.cache.manifest}`)}))
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
