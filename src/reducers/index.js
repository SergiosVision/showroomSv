import { combineReducers } from 'redux'
import postReducer from 'app/about/reducers'
import MainPageReucer from 'app/mainPage/reducers'

export default combineReducers({
    postsSection: postReducer,
    mainPage: MainPageReucer
})