/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 通过combineReducers将多个reducer进行合并
 */

 
import { combineReducers } from 'redux';

import counterReduces from './counter';
import postReducer from './post';

const rootReducers = combineReducers({
    counter: counterReduces,
    post: postReducer 
})

export default rootReducers;