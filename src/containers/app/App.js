import {AppBar} from 'material-ui';
import React from 'react';
import {Sidebar} from '../../components';


/**
 * Application container. Handles state rendering using info from the router.
 * @class Application
 * @extends React.Component
 */
class Application extends React.Component {
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
  }


  /**
   * Renders the component.
   * @method render
   * @returns {jsx} The component
   */
  render() {
    return (
      <main>
        <Sidebar ref="appSidebar" history={this.props.history} />
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
