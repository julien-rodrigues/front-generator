import {createHashHistory} from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {Router} from 'react-router';
import routes from './configs/routes';

let history = createHashHistory({
  queryKey: false
});

injectTapEventPlugin();

// Renders the application depending on the route.
React.render(<Router history={history} routes={routes} />, document.body);
