import {LeftNav} from 'material-ui';
import menuConfig from '../../configs/menu';
import React, {Component} from 'react';


/**
 * Application's sidebar component.
 * @class Sidebar
 * @extends Component
 */
export class Sidebar extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.onNavigate = this.onNavigate.bind(this);
  }


  /**
   * When a menu item is clicked.
   * @method onNavigate
   * @param {event} ev - The event
   * @param {integer} index - Index of the menu item
   * @param {object} payload - Menu item data
   * @returns {void} Nothing
   */
  onNavigate(ev, index, payload) {
    this.props.history.pushState(null, payload.route);
  }


  /**
   * Renders the component.
   * @method render
   * @returns {jsx} The component
   */
  render() {
    return (
      <LeftNav
        docked={false}
        menuItems={menuConfig}
        onChange={this.onNavigate}
        ref="appSidebar"
      />
    );
  }


  /**
   * Handles the open/close method of the sidebar.
   * @method toggleSidebar
   * @returns {void} Nothing
   */
  toggleSidebar() {
    this.refs.appSidebar.toggle();
  }
}
