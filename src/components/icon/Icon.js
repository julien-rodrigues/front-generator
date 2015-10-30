import React, {Component} from 'react';


/**
 * Icons component.
 * @class Icons
 * @extends Component
 */
export class Icon extends Component {
  /**
   * Renders the component.
   * @method render
   * @returns {jsx} The component
   */
  render() {
    return (
      <i {...this.props} className="material-icons">
        {this.props.children}
      </i>
    );
  }
}
