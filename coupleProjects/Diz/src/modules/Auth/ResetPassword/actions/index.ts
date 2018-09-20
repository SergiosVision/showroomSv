export const SHOW_SUBMIT_LOADER = 'reset_password_form/SHOW_SUBMIT_LOADER'

export const showSubmitLoader = () => {
    return {
        type: SHOW_SUBMIT_LOADER
    }
}

export const HIDE_SUBMIT_LOADER = 'reset_password_form/HIDE_SUBMIT_LOADER'

export const hideSubmitLoader = () => {
    return {
        type: HIDE_SUBMIT_LOADER
    }
}

export const SET_RESET_PASSWORD_ERROR = 'reset_password_form/ERROR'

export function setResetPasswordError(error: string) {
    return {
        type: SET_RESET_PASSWORD_ERROR,
        payload: {error}
    }
}
