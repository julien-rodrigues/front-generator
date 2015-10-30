import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Icon} from '../../components';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
  FloatingActionButton
} from 'material-ui';


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
        <Table selectable={true} multiSelectable={true}>
          <TableHeader enableSelectAll={true}>
            <TableRow>
              <TableHeaderColumn tooltip="Id of the product">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Name of the product">Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false} showRowHover={true}>
            {this.props.products.map((product, i) =>
              <TableRow key={i} selected={product.selected}>
                <TableRowColumn>{product.id}</TableRowColumn>
                <TableRowColumn>{product.name}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <FloatingActionButton secondary={true} style={{
          bottom: '20px',
          color: '#fff',
          position: 'fixed',
          right: '20px'
        }}>
          <Icon>add</Icon>
        </FloatingActionButton>
      </div>
    );
  }
}

export default Products;
