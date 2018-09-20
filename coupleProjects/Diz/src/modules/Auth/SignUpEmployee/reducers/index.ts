import {Action, handleActions} from 'redux-actions'
import {ErrorPayload} from 'common/payloads/ErrorActionPayload'
import {
    SHOW_SUBMIT_LOADER,
    HIDE_SUBMIT_LOADER,
    SET_SIGN_UP_EMPLOYEE_ERROR
} from '../actions'

export interface SignUpEmployeeFormState {
    isShowSubmitLoader: boolean,
    errorMessage: string,
}

const initialState = <SignUpEmployeeFormState>{
    isShowSubmitLoader: false,
    errorMessage: undefined as string
}

function handleShowSubmitLoader(state: SignUpEmployeeFormState) {
    return {...state,
        isShowSubmitLoader: true
    }
}

function handleHideSubmitLoader(state: SignUpEmployeeFormState) {
    return {...state,
        isShowSubmitLoader: false
    }
}

function handleError(state: SignUpEmployeeFormState, action: Action<ErrorPayload>) {
    return {
        ...state,
        errorMessage: action.payload.error
    }
}

export default handleActions<SignUpEmployeeFormState>(
    {
        [SET_SIGN_UP_EMPLOYEE_ERROR]: handleError,
        [SHOW_SUBMIT_LOADER]: handleShowSubmitLoader,
        [HIDE_SUBMIT_LOADER]: handleHideSubmitLoader
    } as any,
    initialState
)
