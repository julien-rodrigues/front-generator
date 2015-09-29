import AppRouter from './app/AppRouter';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import Router from 'react-router';

injectTapEventPlugin();

// Renders the application depending on the route.
Router.run(AppRouter, App => {
  React.render(<App />, document.body);
});
