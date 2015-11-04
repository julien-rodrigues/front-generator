import {IndexRoute, Route} from 'react-router';
import React from 'react';
import routesConfig from './routes';
import {
  App,
  Home,
  PageBoilerplate,
  AddProduct,
  Products
} from '../containers';

export default (
  <Route component={App}>
    <IndexRoute component={Home} />
    <Route path={routesConfig.boilerplate.route} component={PageBoilerplate} />
    <Route path={routesConfig.products.route} component={Products} />
    <Route path={routesConfig.addProduct.route} component={AddProduct} />
    <Route path="*" component={Home} />
  </Route>
);
