import { combineReducers } from 'redux';
import postReducer from './postReducer';
import signInReducer from './signInReducer';

export default combineReducers({
    posts: postReducer,
    auth: signInReducer
});