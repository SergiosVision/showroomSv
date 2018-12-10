import { handleActions } from 'redux-actions'

import { 
    SET_USER, RESET_USER,
    SET_LOADING_USER, RESET_LOADING_USER 
} from '../../actions/auth'

const initialState = {
    authenticated: false,
    authStatusReported: false
}

export const handleSetUser = (state = initialState, action) => {
    return {
        ...state,
        authenticated: action.payload,
        authStatusReported: true,
        loading: false
    }
}

export const handleResetUser = (state = initialState) => {
    return {
        ...state,
        authenticated: initialState.authenticated,
        authStatusReported: initialState.authStatusReported
    }
}

export const handleSetLoading = (state = initialState) => {
    return {
        ...state,
        loading: true
    }
}

export const handleResetLoading = (state = initialState) => {
    return {
        ...state,
        loading: initialState.loading
    }
}

export default handleActions({
    [SET_USER]: handleSetUser,
    [RESET_USER]: handleResetUser,
    [SET_LOADING_USER]: handleSetLoading,
    [RESET_LOADING_USER]: handleResetLoading
}, initialState)