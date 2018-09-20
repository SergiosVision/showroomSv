export const SHOW_SUBMIT_LOADER = 'sign_in_form/SHOW_SUBMIT_LOADER'

export const showSubmitLoader = () => {
    return {
        type: SHOW_SUBMIT_LOADER
    }
}

export const HIDE_SUBMIT_LOADER = 'sign_in_form/HIDE_SUBMIT_LOADER'

export const hideSubmitLoader = () => {
    return {
        type: HIDE_SUBMIT_LOADER
    }
}

export const SET_SIGN_IN_ERROR = 'sign_in_form/ERROR'

export function setSignInError(error: string) {
    return {
        type: SET_SIGN_IN_ERROR,
        payload: {error}
    }
}
