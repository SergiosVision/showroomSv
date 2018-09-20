import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

import createHistory from 'history/createBrowserHistory'

import reducers from './reducers'

export const history = createHistory()
export const loggerMiddleware = createLogger()

export const middleware = process.env.NODE_ENV === 'development'
    ? applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
    : applyMiddleware(thunkMiddleware)

export const store = createStore(reducers, middleware)