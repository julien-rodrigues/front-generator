import React, {Component} from 'react';


/**
 * Icons component.
 * @class Icons
 * @extends Component
 */
class Icon extends Component {
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

export default Icon;
