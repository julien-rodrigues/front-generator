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

# Future
- Flow (Waiting for the ES2015 and ES2016 support)
- Drone or Travis

# Known issues
- FSEventStreamFlushSync(): failed assertion '(SInt64)last_id > 0LL': Gulp logs this warning when changing an image that is being watched... Beside of that, everything works fine.
- Also, when changes are made to images, we need to manually reload the page. Seems to be a browser cache problem.
