import {createStore, combineReducers, compose} from 'redux';
import * as reducers from './modules/reducers';
import {reduxReactRouter} from 'redux-router';
import router from '../configs/router';
import {createHashHistory} from 'history';

const rootReducer = combineReducers(reducers);


/**
 * Creates application store and returns it.
 * @returns {object} Application store
 */
export default compose(
  reduxReactRouter({
    router,
    createHistory: createHashHistory
  })
)(createStore)(rootReducer);
