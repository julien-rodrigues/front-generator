import {AppBar} from 'material-ui';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {Sidebar} from '../../components';


/**
 * Application container. Handles state rendering using info from the router.
 * @class Application
 * @extends Component
 */
@connect(state => ({
  router: state.router
}))
class Application extends Component {
  /**
   * Handles the open/close method of the sidebar.
   * @method appSidebarToggle
   * @returns {void} Nothing
   */
  appSidebarToggle() {
    this.refs.appSidebar.toggleSidebar();
  }


  /**
   * @constructor
   */
  constructor() {
    super();
    this.appSidebarToggle = this.appSidebarToggle.bind(this);
    this.onNavigateHandler = this.onNavigateHandler.bind(this);
  }


  /**
   * Main sidebar navigation handler.
   * @method onNavigateHandler
   * @param {string} route - The selected route
   * @returns {void} Nothing
   */
  onNavigateHandler(route) {
    this.props.dispatch(pushState(null, route));
  }


  /**
   * Renders the component.
   * @method render
   * @returns {jsx} The component
   */
  render() {
    return (
      <main>
        <Sidebar ref="appSidebar" onNavigateHandler={this.onNavigateHandler} />
        <AppBar
          onLeftIconButtonTouchTap={this.appSidebarToggle}
          title="Application Example"
        />
        {this.props.children}
      </main>
    );
  }
}

export default Application;
