import {AppBar} from 'material-ui';
import React from 'react';
import Sidebar from '../common/sidebar/Sidebar';


/**
 * Application container. Handles state rendering using info from the router.
 * @class FrontGenerator
 * @extends React.Component
 */
class FrontGenerator extends React.Component {
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
          title="Front Generator Example"
        />
        {this.props.children}
      </main>
    );
  }
}

export default FrontGenerator;
