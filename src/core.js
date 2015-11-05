import store from './redux/create';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';
import router from './configs/router';
import {ReduxRouter} from 'redux-router';

// We need this until React is in v1...
injectTapEventPlugin();

// Renders the application depending on the route.
render(
  <Provider store={store}>
    <ReduxRouter routes={router} />
  </Provider>,
  document.getElementById('app-root')
);
