import { combineReducers } from 'redux'
import postReducer from 'app/about/reducers'

export default combineReducers({
    postsSection: postReducer
})