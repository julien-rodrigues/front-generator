import FrontGenerator from '../app/FrontGenerator';
import Index from '../app/index/Index';
import {IndexRoute, Route} from 'react-router';
import PageBoilerplate from '../app/page-boilerplate/PageBoilerplate';
import Products from '../app/products/Products';
import React from 'react'; // eslint-disable-line no-unused-vars

export default (
  <Route component={FrontGenerator}>
    <IndexRoute component={Index} />
    <Route path="page-boilerplate" component={PageBoilerplate} />
    <Route path="products" component={Products} />
    <Route path="*" component={Index} />
  </Route>
);
