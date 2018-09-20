import {Action, handleActions} from 'redux-actions'
import {ErrorPayload} from 'common/payloads/ErrorActionPayload'
import {
    SHOW_SUBMIT_LOADER,
    HIDE_SUBMIT_LOADER,
    SET_FORGOT_PASSWORD_ERROR
} from '../actions'

export interface ForgotPasswordFormState {
    isShowSubmitLoader: boolean,
    errorMessage: string,
}

const initialState = <ForgotPasswordFormState>{
    isShowSubmitLoader: false,
    errorMessage: undefined as string
}

function handleShowSubmitLoader(state: ForgotPasswordFormState) {
    return {...state,
        isShowSubmitLoader: true
    }
}

function handleHideSubmitLoader(state: ForgotPasswordFormState) {
    return {...state,
        isShowSubmitLoader: false
    }
}

function handleError(state: ForgotPasswordFormState, action: Action<ErrorPayload>) {
    return {
        ...state,
        errorMessage: action.payload.error
    }
}

export default handleActions<ForgotPasswordFormState>(
    {
        [SET_FORGOT_PASSWORD_ERROR]: handleError,
        [SHOW_SUBMIT_LOADER]: handleShowSubmitLoader,
        [HIDE_SUBMIT_LOADER]: handleHideSubmitLoader
    } as any,
    initialState
)
