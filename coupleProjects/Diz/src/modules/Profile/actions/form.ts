export const SHOW_SUBMIT_LOADER = 'profile_data/SHOW_SUBMIT_LOADER'

export const showSubmitLoader = () => {
    return {
        type: SHOW_SUBMIT_LOADER
    }
}

export const HIDE_SUBMIT_LOADER = 'profile_data/HIDE_SUBMIT_LOADER'

export const hideSubmitLoader = () => {
    return {
        type: HIDE_SUBMIT_LOADER
    }
}

export const SET_PROFILE_ERROR = 'profile_data/ERROR'

export function setProfileUpdateError(error: string) {
    return {
        type: SET_PROFILE_ERROR,
        payload: {error}
    }
}
