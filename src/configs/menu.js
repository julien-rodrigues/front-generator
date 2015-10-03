import {MenuItem} from 'material-ui';

export default [{
  text: 'Menu',
  type: MenuItem.Types.SUBHEADER
}, {
  route: '/',
  text: 'Dashboard'
}, {
  route: '/products',
  text: 'Product list'
}, {
  route: '/page-boilerplate',
  text: 'A sample page'
}];
