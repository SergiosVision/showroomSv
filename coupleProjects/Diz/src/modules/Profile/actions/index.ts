import { ProfilePayload } from 'common/payloads/ProfilePayload'

export const PROFILE_REQUEST = 'profile/REQUEST'

export const requestProfile = () => {
    return {
        type: PROFILE_REQUEST
    }
}

export const PROFILE_ERROR = 'profile/ERROR'

export const errorProfile = (error: any) => {
    return {
        type: PROFILE_ERROR,
        payload: {error}
    }
}

export const PROFILE_SUCCESS = 'profile/SUCCESS'

export function profileReceive(payload: ProfilePayload) {
    return {
        type: PROFILE_SUCCESS,
        payload: payload
    }
}

export const PROFILE_FORCE_LOAD = 'profile/SET_FORCE_LOAD'

export const setProfileForceLoad = (payload: Boolean) => {
    return {
        type: PROFILE_FORCE_LOAD,
        payload: payload
    }
}