import config from './config';
import wrench from 'wrench';


/**
 * Import tasks.
 */
wrench.readdirSyncRecursive(config.paths.tasks).filter(
  file => (/\.(js)$/i).test(file)
).map(
  file => require(config.paths.tasks + file)
);
