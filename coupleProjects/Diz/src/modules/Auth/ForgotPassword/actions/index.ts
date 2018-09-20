export const SHOW_SUBMIT_LOADER = 'forgot_password_form/SHOW_SUBMIT_LOADER'

export const showSubmitLoader = () => {
    return {
        type: SHOW_SUBMIT_LOADER
    }
}

export const HIDE_SUBMIT_LOADER = 'forgot_password_form/HIDE_SUBMIT_LOADER'

export const hideSubmitLoader = () => {
    return {
        type: HIDE_SUBMIT_LOADER
    }
}

export const SET_FORGOT_PASSWORD_ERROR = 'forgot_password_form/ERROR'

export function setForgotPasswordError(error: string) {
    return {
        type: SET_FORGOT_PASSWORD_ERROR,
        payload: {error}
    }
}
