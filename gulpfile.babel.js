import config from './tasks/config';
import wrench from 'wrench';


/**
 * Imports tasks.
 */
wrench.readdirSyncRecursive(config.paths.tasks).filter(
  file => (/\.(js)$/i).test(file)
).map(
  file => require(config.paths.tasks + file)
);
