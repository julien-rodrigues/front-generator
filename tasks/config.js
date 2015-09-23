export default {
  cache: {
    manifest: 'cache-manifest.json'
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
  paths: {
    assets: 'assets/',
    dist: 'dist/',
    images: 'assets/img/',
    source: 'src/',
    stage: '.stage/',
    tasks: './tasks/'
  },
  scripts: {
    entryPoint: 'main.js'
  },
  styles: {
    autoprefixer: 'last 1 version',
    entryPoint: 'main.scss',
    linter: {
      config: '.scss-lint.yml'
    }
  }
};
