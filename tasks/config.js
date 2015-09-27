export default {
  cache: {
    manifest: 'cache-manifest.json'
  },
  cdn: {
    host: 'https://cdn.test.com/'
  },
  html: {
    entryPoint: 'index.html',
    minifier: {
      conditionals: true,
      empty: true,
      spare: true,
      quotes: true
    }
  },
  images: {
    imageMin: {
      interlaced: true,
      progressive: true,
      optimizationLevel: 3
    },
    mappingFile: '_sprite.scss',
    sprite: 'sprite.png'
  },
  paths: {
    assets: 'assets/',
    dist: 'dist/',
    images: 'assets/img/',
    source: 'src/',
    sprite: 'assets/img/sprite',
    stage: '.stage/',
    tasks: './tasks/'
  },
  scripts: {
    entryPoint: 'main.js'
  },
  server: {
    port: 3000
  },
  styles: {
    autoprefixer: 'last 1 version',
    entryPoint: 'main.scss',
    linter: {
      config: '.scss-lint.yml'
    }
  }
};
