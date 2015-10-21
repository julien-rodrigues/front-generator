import {createHashHistory} from 'history';
import createStore from './redux/create';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './configs/routes';

// Instanciates application store.
let store = createStore();

// Instanciates application history.
let history = createHashHistory({
  queryKey: false
});

// We need this until React is in v1...
injectTapEventPlugin();

// Renders the application depending on the route.
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app-root')
);
