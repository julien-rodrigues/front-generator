import {MenuItem} from 'material-ui';
import routesConfig from './routes';

export default [{
  text: 'Menu',
  type: MenuItem.Types.SUBHEADER
}, {
  route: routesConfig.dashboard.route,
  text: routesConfig.dashboard.label
}, {
  route: routesConfig.products.route,
  text: routesConfig.products.label
}, {
  route: routesConfig.boilerplate.route,
  text: routesConfig.boilerplate.label
}];
