// Actions declaration.
export const ADD_PRODUCTS = 'ADD_PRODUCTS';


/**
 * Add a new product action creator.
 * @method addProduct
 * @param {string} name - The name of the product.
 * @returns {object} The action
 */
export function addProduct(name) {
  return {
    type: ADD_PRODUCTS,
    name
  };
}
