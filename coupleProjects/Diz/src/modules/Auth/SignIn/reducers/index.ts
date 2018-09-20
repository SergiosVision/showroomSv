import {Action, handleActions} from 'redux-actions'
import {ErrorPayload} from 'common/payloads/ErrorActionPayload'
import {
    SHOW_SUBMIT_LOADER,
    HIDE_SUBMIT_LOADER,
    SET_SIGN_IN_ERROR
} from '../actions'

export interface SignInFormState {
    isShowSubmitLoader: boolean,
    errorMessage: string,
}

const initialState = <SignInFormState>{
    isShowSubmitLoader: false,
    errorMessage: undefined as string
}

function handleShowSubmitLoader(state: SignInFormState) {
    return {...state,
        isShowSubmitLoader: true
    }
}

function handleHideSubmitLoader(state: SignInFormState) {
    return {...state,
        isShowSubmitLoader: false
    }
}

function handleError(state: SignInFormState, action: Action<ErrorPayload>) {
    return {
        ...state,
        errorMessage: action.payload.error
    }
}

export default handleActions<SignInFormState>(
    {
        [SET_SIGN_IN_ERROR]: handleError,
        [SHOW_SUBMIT_LOADER]: handleShowSubmitLoader,
        [HIDE_SUBMIT_LOADER]: handleHideSubmitLoader
    } as any,
    initialState
)
