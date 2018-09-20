import {Action, handleActions} from 'redux-actions'
import {ErrorPayload} from 'common/payloads/ErrorActionPayload'
import {
    SHOW_SUBMIT_LOADER,
    HIDE_SUBMIT_LOADER,
    SET_PROFILE_ERROR
} from '../actions/form'

export interface ProfileUpateState {
    isShowSubmitLoader: boolean,
    errorMessage: string,
}

const initialState = <ProfileUpateState>{
    isShowSubmitLoader: false,
    errorMessage: undefined as string
}

function handleShowSubmitLoader(state: ProfileUpateState) {
    return {
        ...state,
        isShowSubmitLoader: true
    }
}

function handleHideSubmitLoader(state: ProfileUpateState) {
    return {
        ...state,
        isShowSubmitLoader: false
    }
}

function handleError(state: ProfileUpateState, action: Action<ErrorPayload>) {
    return {
        ...state,
        errorMessage: action.payload.error
    }
}

export default handleActions<ProfileUpateState>(
    {
        [SET_PROFILE_ERROR]: handleError,
        [SHOW_SUBMIT_LOADER]: handleShowSubmitLoader,
        [HIDE_SUBMIT_LOADER]: handleHideSubmitLoader
    } as any,
    initialState
)
