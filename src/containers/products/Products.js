import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';


/**
 * Products page component.
 * @class Products
 * @extends Component
 */
@connect(state => ({
  products: state.products
}))
class Products extends Component {
  /**
   * Properties types rules
   */
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired).isRequired
  };

  /**
   * Renders the page.
   * @method render
   * @returns {jsx} The page
   */
  render() {
    return (
      <div>
        <h2>Products page</h2>
        <ul>
          {this.props.products.map((product, i) =>
            <li key={i}>{product.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Products;
