import {reload as bSReload} from 'browser-sync';
import config from './config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import normalizeUrl from 'normalize-url';
import spritesmith from 'gulp.spritesmith';
import through from 'through2';

const $ = gulpLoadPlugins();

// Watch tasks.
if (!$.util.env.prod && $.util.env.watch) {
  // Watch for changes in images, excluding sprite images.
  gulp.watch([
    `${config.paths.source}${config.paths.images}**/*.*`,
    `!${config.paths.source}${config.paths.sprite}**/*.*`
  ], changed => {
    return gulp.src(changed.path, {base: config.paths.source})
      .pipe(gulp.dest(config.paths.dist))
      .pipe(bSReload({stream: true}))
      .pipe($.size({title: 'Modified image size'}))
      .on('error', $.util.log);
  });

  // Watch for changes only in sprite images.
  gulp.watch(`${config.paths.source}${config.paths.sprite}**/*.*`, () => {
    gulp.start('create-sprite');
  });
}


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
 * Cache busting task.
 */
gulp.task('cdn-prefix', ['cache-revision'], () => {
  return gulp.src(`${config.paths.stage}${config.cache.manifest}`)
    .pipe(cdnPrefix())
    .pipe(gulp.dest(config.paths.stage))
    .on('error', $.util.log);
});


/**
 * Sprite creation task.
 */
gulp.task('create-sprite', () => {
  return gulp.src(`${config.paths.source}${config.paths.sprite}**/*.*`)
    .pipe(spritesmith({
      imgName: `${config.paths.images}${config.images.sprite}`,
      cssName: config.images.mappingFile
    }))
    .pipe(gulp.dest(config.paths.source))
    .on('error', $.util.log);
});


/**
 * Image compression task.
 */
gulp.task('compress-images', ['copy:stage'], () => {
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
