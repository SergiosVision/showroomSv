import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import AuthReducer from 'common/reducers/auth'

import MainPageReucer from 'app/mainPage/reducers'
import SinglePageReucer from 'app/work/reducers'

import MainPageDashboardReducer from 'admin/mainPage/reducers'

export default combineReducers({
    mainPage: MainPageReucer,
    singlePage: SinglePageReucer,
    auth: AuthReducer,
    dashboardWorks: MainPageDashboardReducer,
    form: formReducer
})