/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 创建store
 */

import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';
import devToolsEnhancer from 'remote-redux-devtools';

const store = createStore(rootReducers,devToolsEnhancer());
export default store;