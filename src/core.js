import {createHashHistory} from 'history';
import {createStore} from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import products from './reducers';
import {Provider} from 'react-redux';
import React, {render} from 'react';
import {Router} from 'react-router';
import routes from './configs/routes';

// Instanciates application store.
let store = createStore(products);

// Instanciates application history.
let history = createHashHistory({
  queryKey: false
});

// We need this until React is in v1...
injectTapEventPlugin();

// Renders the application depending on the route.
render(
  <Provider store={store}>
    {() => <Router history={history} routes={routes} />}
  </Provider>,
  document.body
);
