import {DefaultRoute, Route} from 'react-router';
import Index from './index/Index';
import FrontGenerator from './FrontGenerator';
import React from 'react'; // eslint-disable-line no-unused-vars

export default (
  <Route name="app" path="/" handler={FrontGenerator}>
    <DefaultRoute handler={Index} />
  </Route>
);
