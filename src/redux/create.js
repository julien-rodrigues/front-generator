import {createStore, combineReducers} from 'redux';
import * as reducers from './modules/reducers';

const rootReducer = combineReducers(reducers);


/**
 * Creates application store and returns it.
 * @returns {object} Application store
 */
export default function() {
  return createStore(rootReducer);
}
