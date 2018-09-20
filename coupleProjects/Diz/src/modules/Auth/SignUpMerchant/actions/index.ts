export const SHOW_SUBMIT_LOADER = 'sign_up_merchant_form/SHOW_SUBMIT_LOADER'

export const showSubmitLoader = () => {
    return {
        type: SHOW_SUBMIT_LOADER
    }
}

export const HIDE_SUBMIT_LOADER = 'sign_up_merchant_form/HIDE_SUBMIT_LOADER'

export const hideSubmitLoader = () => {
    return {
        type: HIDE_SUBMIT_LOADER
    }
}

export const SET_SIGN_UP_MERCHANT_ERROR = 'sign_up_merchant_form/ERROR'

export function setSignUpMerchantError(error: string) {
    return {
        type: SET_SIGN_UP_MERCHANT_ERROR,
        payload: {error}
    }
}
