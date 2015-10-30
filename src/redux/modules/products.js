const ADD_PRODUCT = 'ADD_PRODUCT';
const INITIAL_STATE = [{
  id: 12,
  name: 'Bananas',
  selected: false
}, {
  id: 89,
  name: 'Tomatoes',
  selected: false
}, {
  id: 456,
  name: 'Nutella',
  selected: false
}, {
  id: 22,
  name: 'Carrots',
  selected: false
}, {
  id: 1,
  name: 'Yogourt',
  selected: false
}, {
  id: 543,
  name: 'Cheese',
  selected: false
}, {
  id: 98,
  name: 'Bread',
  selected: false
}, {
  id: 11,
  name: 'Milk',
  selected: false
}];


/**
 * Products reducer.
 * @method products
 * @param {array} state - The current state.
 * @param {string} action - The action to perform.
 * @returns {object} Updated state
 */
export function products(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PRODUCT:
    return state.concat({
      name: action.name
    });
  default:
    return state;
  }
}
