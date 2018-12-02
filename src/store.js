import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import createHistory from 'history/createBrowserHistory'

const initialState = {}

const middleWare = [thunk]

export const history = createHistory()

export const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);