import { combineReducers } from 'redux'

import AuthReducer from 'common/reducers'

import MainPageReucer from 'app/mainPage/reducers'
import SinglePageReucer from 'app/work/reducers'

export default combineReducers({
    mainPage: MainPageReucer,
    singlePage: SinglePageReucer,
    auth: AuthReducer
})