import {Action, handleActions} from 'redux-actions'
import {ErrorPayload} from 'common/payloads/ErrorActionPayload'
import {
    SHOW_SUBMIT_LOADER,
    HIDE_SUBMIT_LOADER,
    SET_RESET_PASSWORD_ERROR
} from '../actions'

export interface ResetPasswordFormState {
    isShowSubmitLoader: boolean,
    errorMessage: string,
}

const initialState = <ResetPasswordFormState>{
    isShowSubmitLoader: false,
    errorMessage: undefined as string
}

function handleShowSubmitLoader(state: ResetPasswordFormState) {
    return {...state,
        isShowSubmitLoader: true
    }
}

function handleHideSubmitLoader(state: ResetPasswordFormState) {
    return {...state,
        isShowSubmitLoader: false
    }
}

function handleError(state: ResetPasswordFormState, action: Action<ErrorPayload>) {
    return {
        ...state,
        errorMessage: action.payload.error
    }
}

export default handleActions<ResetPasswordFormState>(
    {
        [SET_RESET_PASSWORD_ERROR]: handleError,
        [SHOW_SUBMIT_LOADER]: handleShowSubmitLoader,
        [HIDE_SUBMIT_LOADER]: handleHideSubmitLoader
    } as any,
    initialState
)
