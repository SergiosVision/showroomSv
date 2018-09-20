import { Action, handleActions } from 'redux-actions'

import { ErrorPayload } from 'common/payloads/ErrorActionPayload'

import { ProfilePage } from 'common/types/profile'

import {
    PROFILE_REQUEST,
    PROFILE_ERROR,
    PROFILE_SUCCESS,
    PROFILE_FORCE_LOAD
} from '../actions'

import { ProfilePayload } from 'common/payloads/ProfilePayload'

export interface ProfilePageState {
    isFetching: boolean,
    profilePage: ProfilePage,
    error?: any,
    forceLoad: boolean
}

const initialState = {
    isFetching: false,
    profilePage: undefined,
    error: undefined as any,
    forceLoad: false
} as ProfilePageState

const handleRequest = (state: ProfilePageState) => {
    return {
        ...state,
        isFetching: true,
        profilePage: initialState.profilePage,
        error: undefined as any
    }
}

const handleError = (state: ProfilePageState, action: Action<ErrorPayload>) => {
    return {
        ...state,
        isFetching: false,
        error: action.payload.error
    }
}

const handleSuccess = (state: ProfilePageState, action: Action<ProfilePayload>) => {
    return {
        ...state,
        isFetching: false,
        profilePage: action.payload.user,
        error: undefined as any
    }
}

const handleForceLoad = (state: ProfilePageState, action: Action<{}>) => {
    return {
        ...state,
        forceLoad: action.payload
    }
}

export default handleActions<ProfilePageState> (
    {
        [PROFILE_REQUEST]: handleRequest,
        [PROFILE_ERROR]: handleError,
        [PROFILE_SUCCESS]: handleSuccess,
        [PROFILE_FORCE_LOAD]: handleForceLoad
    } as any,
    initialState
)