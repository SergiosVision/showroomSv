export const SET_USER = 'auth/SET_USER'

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const RESET_USER = 'auth/RESET_USER'

export const resetUser = () => {
    return {
        type: RESET_USER
    }
}

export const SET_LOADING_USER = 'auth/SET_LOADING_USER'

export const setLoadingUser = () => {
    return {
        type: SET_LOADING_USER
    }
}

export const RESET_LOADING_USER = 'auth/RESET_LOADING_USER'

export const resetLoadingUser = () => {
    return {
        type: RESET_LOADING_USER
    }
}