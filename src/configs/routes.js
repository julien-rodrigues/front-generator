import {App, Home, PageBoilerplate, Products} from '../containers';
import {IndexRoute, Route} from 'react-router';
import React from 'react'; // eslint-disable-line no-unused-vars

export default (
  <Route component={App}>
    <IndexRoute component={Home} />
    <Route path="page-boilerplate" component={PageBoilerplate} />
    <Route path="products" component={Products} />
    <Route path="*" component={Home} />
  </Route>
);
