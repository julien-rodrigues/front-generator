import {AppBar} from 'material-ui';
import React from 'react';
import {RouteHandler} from 'react-router';


/**
 * Application container. Handles state rendering using info from the router.
 * @class FrontGenerator
 * @extends React.Component
 */
class FrontGenerator extends React.Component {


  /**
   * Renders the component.
   * @method render
   * @return {jsx} The component.
   */
  render() {
    return (
      <main>
        <AppBar />
        <RouteHandler />
      </main>
    );
  }

}

export default FrontGenerator;
