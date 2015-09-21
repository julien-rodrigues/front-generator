export default {
  paths: {
    dist: 'dist/',
    source: 'src/',
    stage: '.stage/',
    tasks: './tasks/'
  },
  styles: {
    autoprefixer: 'last 1 version',
    entryPoint: 'main.scss',
    linter: {
      config: '.scss-lint.yml'
    }
  },
  scripts: {
    entryPoint: 'main.js'
  },
  html: {
    minifier: {
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }
  }
};
