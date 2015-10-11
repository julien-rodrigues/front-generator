import {ADD_PRODUCT} from '../actions';

const INITIAL_STATE = [{
  name: 'Bananas'
}];


/**
 * Products reducer.
 * @method products
 * @param {array} state - The current state.
 * @param {string} action - The action to perform.
 * @returns {object} Updated state
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PRODUCT:
    return state.concat({
      name: action.name
    });
  default:
    return state;
  }
}
