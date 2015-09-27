# front-generator
My currently in work personal front-end architecture generator (React, Flux, ES2015/16, Eslint, SASS, ...). Use it to build an independent front-end architecture.

# Current Gulp tasks
- build
- build --watch
- build --prod

For development build just launch `gulp build` as development is the default mode.
This is just a security.

# Includes
- Gulp
- SASS
- SCSSLint
- Babel
- Eslint
- Browserify
- Browsersync

# Methodologies
- BEM
- Flux

#TODO
- Tests
- Karma
- Drone or Travis

# Future
- Flow (Waiting for the ES2015 and ES2016 support)

# Known issues
- When watching for changes, if you rename an image, it will not remove the old one. But the old image will be removed when a new build is made. As this is a minor issue, I will probably investigate in a far future.
- Also, when changes are made to images, we need to manually reload the page. Seems to be a browser cache problem.
